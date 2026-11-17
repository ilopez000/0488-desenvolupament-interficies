# Recurs 0488 · Login amb Google + Cloudflare D1

Continuació del recurs **«Inicia la sessió amb Google»** del mòdul 0488 Desenvolupament d'interfícies (DAM2, Prat FP).

**PratPerfil** és una web feta amb **React 19 + TypeScript + Vite** i un **Worker de Cloudflare** amb una base de dades **D1** (SQLite). Quan entres amb Google:

- **la primera vegada** et **registra**: crea la teva fila a la taula `users`;
- **les vegades següents** et **recupera**: llegeix la teva fila i en suma una visita;
- a **El meu perfil** pots **consultar** i **canviar** les teves dades (àlies, cicle, bio i color preferit) o donar-te de baixa;
- a **Usuaris** veus la llista de persones registrades (sense correus).

```
Navegador (React)                      Worker (/api)                         D1
GoogleLogin → credencial (JWT) ──────► verifica el JWT amb jose ──────────► taula users
fetch('/api/…', Bearer credencial)     (firma de Google, aud, exp)          INSERT / SELECT / UPDATE / DELETE
```

## Arrencar-lo

**A Windows:** doble clic a `arrenca.bat` i tria la base de dades:

| Opció | Base de dades | Què cal |
|---|---|---|
| **1 · Local** | Una còpia de D1 a la carpeta `.wrangler` (la crea `wrangler`) | Res |
| **2 · Cloudflare** | La D1 de debò del teu compte (`login-google-d1-db`) | Haver entrat amb `npx wrangler login` (el `.bat` ho fa si cal) i l'`database_id` de la teva BD a `wrangler.jsonc` |

**A mà:**

```bash
cp .env.example .env            # i posa-hi el teu VITE_GOOGLE_CLIENT_ID
npm install
npm run db:local                # crea la taula users a la D1 local
npm run dev                     # http://localhost:5173  (npm run dev:remota → D1 de Cloudflare)
```

**Publicar-ho a Internet:** `desplega.bat` (o `npm run db:remote` + `npm run deploy`). Després afegeix l'adreça `https://login-google-d1.<el-teu-subdomini>.workers.dev` als *orígens de JavaScript autoritzats* del client OAuth de Google Cloud.

### Requisits

- Node.js 20 o superior.
- Un **ID de client OAuth** de Google Cloud (el del recurs del login amb Google) amb els orígens `http://localhost:5173` i `http://localhost`.
- Per a la D1 de Cloudflare: un compte de Cloudflare (gratuït) i la base de dades creada:
  `npx wrangler d1 create login-google-d1-db` → copia l'`database_id` a `wrangler.jsonc`.

## Ordres útils

| Ordre | Què fa |
|---|---|
| `npm run db:local` / `npm run db:remote` | Aplica les migracions (crea la taula `users`) a la D1 local / de Cloudflare |
| `npm run db:veure` / `npm run db:veure-remota` | Mostra el contingut de la taula `users` |
| `npm run dev` / `npm run dev:remota` | Web + API amb la D1 local / de Cloudflare |
| `npm run deploy` | Compila i publica el Worker |

## La taula `users`

`migrations/0001_crear_taula_users.sql`

| Columna | Qui la posa | Per a què |
|---|---|---|
| `id` | Google (`sub` del token) | Clau primària. No canvia mai (l'email sí que pot canviar) |
| `email`, `nom`, `foto` | Google, a cada inici de sessió | Dades del compte |
| `alies`, `cicle`, `bio`, `color` | **L'usuari**, des de *El meu perfil* | Les dades que es poden consultar i actualitzar |
| `visites`, `creat`, `ultim_acces` | El servidor | Quantes vegades ha entrat, quan es va registrar i l'últim accés |

## L'API (`worker/index.ts`)

Totes les rutes demanen la capçalera `Authorization: Bearer <credencial de Google>`.

| Ruta | SQL | Què fa |
|---|---|---|
| `POST /api/login` | `INSERT … ON CONFLICT (id) DO UPDATE … RETURNING *` | Registra (1a vegada) o actualitza i torna la fila. `nou: true` si s'acaba de registrar |
| `GET /api/jo` | `SELECT * FROM users WHERE id = ?` | Consulta les meves dades |
| `PUT /api/jo` | `UPDATE users SET alies = ?, cicle = ?, bio = ?, color = ? WHERE id = ? RETURNING *` | Canvia les meves dades (validades al servidor) |
| `DELETE /api/jo` | `DELETE FROM users WHERE id = ?` | Em dona de baixa |
| `GET /api/usuaris` | `SELECT alies, foto, cicle, bio, color, visites, creat FROM users` | Llista pública (sense `email` ni `id`) |

## El codi clau, fragment a fragment

### 1. Verificar el token al Worker (`worker/google.ts`)

```ts
const CLAUS_GOOGLE = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

const { payload } = await jwtVerify(token, CLAUS_GOOGLE, {
  issuer: ['https://accounts.google.com', 'accounts.google.com'],
  audience: env.GOOGLE_CLIENT_ID,
})
```

| Fragment | Què fa |
|---|---|
| `createRemoteJWKSet(...)` | Descarrega (i guarda) les claus públiques amb què Google signa els tokens |
| `jwtVerify(token, CLAUS_GOOGLE, …)` | Comprova la **firma** i que no hagi **caducat** (`exp`). Si falla, llança un error → 401 |
| `issuer` | El token l'ha d'haver emès Google |
| `audience: env.GOOGLE_CLIENT_ID` | El token ha de ser per a **la nostra** aplicació, no per a una altra |
| `payload.sub` | L'identificador de l'usuari: serà l'`id` de la taula |

Al navegador **no** ens refiem de res: el Worker sap qui és l'usuari pel token verificat, no perquè la web li ho digui.

### 2. Registre o inici de sessió amb un sol SQL (`POST /api/login`)

```sql
INSERT INTO users (id, email, nom, foto, alies, visites)
VALUES (?1, ?2, ?3, ?4, ?5, 1)
ON CONFLICT (id) DO UPDATE SET
  email = excluded.email, nom = excluded.nom, foto = excluded.foto,
  visites = users.visites + 1, ultim_acces = datetime('now')
RETURNING *
```

| Fragment | Què fa |
|---|---|
| `INSERT … VALUES (?1, …)` | Si l'usuari no hi és, el **registra** amb 1 visita i l'àlies = el seu primer nom |
| `ON CONFLICT (id) DO UPDATE` | Si ja hi és (mateixa clau primària), en lloc de fallar **actualitza** la fila |
| `excluded.email` | El valor que intentàvem inserir (el que ve de Google ara) |
| `users.visites + 1` | El valor que ja hi havia, més un |
| `RETURNING *` | Torna la fila tal com ha quedat, sense un segon `SELECT` |
| `.bind(...)` | Els valors van a part de l'SQL: així no hi pot haver **injecció SQL** |

### 3. Actualitzar només el que toca (`PUT /api/jo`)

```ts
if (alies.length < 2 || alies.length > 20) return error("L'àlies ha de tenir entre 2 i 20 caràcters", 400)
if (!CICLES.includes(cicle)) return error('Cicle no vàlid', 400)
...
await env.DB.prepare('UPDATE users SET alies = ?, cicle = ?, bio = ?, color = ? WHERE id = ? RETURNING *')
  .bind(alies, cicle, bio, color, jo.id)
  .first<Usuari>()
```

| Fragment | Què fa |
|---|---|
| Validacions | El servidor torna a validar tot el que envia el formulari (el navegador es pot saltar) |
| `SET alies = ?, cicle = ?, …` | Només aquests quatre camps: encara que el cos porti `visites` o `id`, s'ignoren |
| `WHERE id = ?` amb `jo.id` | L'`id` surt del **token**, mai del cos: ningú pot canviar les dades d'un altre |
| `.first<Usuari>()` | Torna la primera (i única) fila del `RETURNING *` |

### 4. La web: cada crida porta la credencial (`src/api.ts`)

```ts
const resposta = await fetch(ruta, {
  ...opcions,
  headers: {
    Authorization: `Bearer ${credencial}`,
    ...(opcions.body ? { 'Content-Type': 'application/json' } : {}),
  },
})
```

| Fragment | Què fa |
|---|---|
| `Authorization: Bearer …` | Envia la credencial de Google perquè el Worker sàpiga qui som |
| `Content-Type` només si hi ha cos | Al `PUT` enviem JSON; al `GET` i al `DELETE`, no |
| `ErrorApi` amb `status` | Si el Worker respon 401 (credencial caducada), la pàgina tanca la sessió |

### 5. Iniciar la sessió (`src/sessio/SessioProvider.tsx`)

```ts
const { usuari, nou } = await entrar(credencial)   // POST /api/login
setSessio({ credencial, caduca: caducaDe(credencial), usuari, nou })
```

| Fragment | Què fa |
|---|---|
| `entrar(credencial)` | El Worker verifica la credencial i fa el registre o l'actualització |
| `usuari` | La fila de la taula `users`: és el que pinten la capçalera i el perfil |
| `nou` | Per dir «Benvingut/da» (registre) o «Hola de nou» (ja hi era) |
| `caducaDe(credencial)` | Llegeix l'`exp` del JWT: la credencial de Google dura 1 hora |

### 6. Consultar i desar (`src/pagines/Perfil.tsx`)

| Botó | Crida | SQL |
|---|---|---|
| **Desa els canvis** | `desarJo(credencial, form)` | `UPDATE … RETURNING *` → `canviaUsuari(actualitzat)` |
| **Torna a llegir de la BD** | `llegirJo(credencial)` | `SELECT * FROM users WHERE id = ?` |
| **Dona'm de baixa** | `esborrarJo(credencial)` | `DELETE FROM users WHERE id = ?` → tanca la sessió |

## Per comprovar que les dades són a la base de dades

1. Entra, canvia l'àlies i el color i desa. Tanca la sessió i torna a entrar: hi continuen.
2. `npm run db:veure` (o `db:veure-remota`): surt la teva fila.
3. Amb la D1 de Cloudflare: panell de Cloudflare → **Storage & Databases → D1 → login-google-d1-db → Console** → `SELECT * FROM users;`
4. Obre la web amb un altre compte de Google: a **Usuaris** en surten dos.

## Exercicis

1. Afegeix una columna nova (`ciutat`) amb una migració `0002_afegir_ciutat.sql` (`ALTER TABLE users ADD COLUMN ciutat TEXT NOT NULL DEFAULT ''`) i fes-la editable.
2. A la llista d'usuaris, afegeix un cercador per àlies (`WHERE alies LIKE ?`).
3. Fes que només els correus de `@pratfp.com` es puguin registrar (comprova `payload.hd` o l'email al Worker).
4. Afegeix una columna `rol` i una pàgina d'administració on només els `admin` vegin els correus.

---

Ignasi López Aylagas · ilopez@pratfp.com
