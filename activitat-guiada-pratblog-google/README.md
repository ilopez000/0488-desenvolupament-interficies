# PratBlog · activitat guiada: inicia la sessió amb Google (MP 0488)

Blog fet amb **React 19 + TypeScript + Vite + React Router 8**. Té una part pública (la llista d'articles) i una
**part d'administració** (`/admin`) per crear, editar i esborrar articles.

El problema: **ara mateix qualsevol persona pot entrar a l'administració**. L'objectiu de l'activitat és que només
hi puguin entrar els administradors, **iniciant la sessió amb el seu compte de Google**. Falten **12 trossos de
codi** marcats amb `TODO 1` … `TODO 12`. La **web guia** que et donarà el docent t'acompanya pas a pas.

## Com es posa en marxa

```bash
git clone https://github.com/ilopez000/0488-desenvolupament-interficies.git
cd 0488-desenvolupament-interficies/activitat-guiada-pratblog-google
npm install
```

Crea el fitxer `.env` a partir de la plantilla i omple'l amb el teu ID de client de Google i el teu correu:

```bash
copy .env.example .env      # Windows
cp .env.example .env        # macOS / Linux
```

```bash
npm run dev     # http://localhost:5173 (sempre aquest port: és el que coneix Google)
npm test        # comprova els 12 TODO
```

## Els 12 TODO

| # | Fitxer | Què has de fer |
|---|---|---|
| 1 | `src/config.ts` | Llegir l'ID de client de `VITE_GOOGLE_CLIENT_ID` |
| 2 | `src/config.ts` | Convertir `VITE_ADMINS` en una llista de correus |
| 3 | `src/main.tsx` | Embolcallar l'app amb `<GoogleOAuthProvider>` |
| 4 | `src/auth/token.ts` | Descodificar la credencial (JWT) amb `jwtDecode` |
| 5 | `src/auth/token.ts` | Passar dels claims de Google al nostre `Usuari` |
| 6 | `src/auth/token.ts` | Crear la `Sessio` (caducitat en mil·lisegons) |
| 7 | `src/auth/SessioProvider.tsx` | `iniciaSessio`: estat + `localStorage` |
| 8 | `src/auth/SessioProvider.tsx` | `tancaSessio`: `googleLogout`, `localStorage` i estat |
| 9 | `src/auth/permisos.ts` | Decidir qui és administrador |
| 10 | `src/pagines/Login.tsx` | Posar el botó `<GoogleLogin />` |
| 11 | `src/auth/RutaAdmin.tsx` | Protegir `/admin`: login, «no tens permís» o `<Outlet />` |
| 12 | `src/components/Capcalera.tsx` | Mostrar qui hi ha connectat i el botó «Surt» |

Per comprovar només un TODO, fes servir el seu número amb dues xifres:

```bash
npm test -- -t "TODO 04"
```

Cada fitxer de proves de `src/proves/` porta el número dels TODO que comprova. Les proves no es connecten mai a
Google: fan servir un botó i uns tokens de mentida.

## Estructura

```
src/
├── config.ts               ← TODO 1 i 2
├── main.tsx                ← TODO 3
├── App.tsx                 rutes (ja fet)
├── auth/
│   ├── tipus.ts            ClaimsGoogle, Usuari, Sessio (ja fet)
│   ├── token.ts            ← TODO 4, 5 i 6
│   ├── SessioContext.ts    (ja fet)
│   ├── SessioProvider.tsx  ← TODO 7 i 8
│   ├── useSessio.ts        (ja fet)
│   ├── permisos.ts         ← TODO 9
│   └── RutaAdmin.tsx       ← TODO 11
├── components/
│   ├── Capcalera.tsx       ← TODO 12
│   └── Avatar.tsx, Disposicio.tsx, TargetaArticle.tsx (ja fets)
├── dades/                  articles del blog al localStorage (ja fet)
├── pagines/
│   ├── Login.tsx           ← TODO 10
│   ├── Inici.tsx, Article.tsx, NoAutoritzat.tsx, NoTrobada.tsx
│   └── admin/Panell.tsx, admin/EditorArticle.tsx
└── proves/                 les proves de cada TODO
```

> ⚠️ El fitxer `.env` **no es puja mai** a GitHub (ja és al `.gitignore`).
