# Recurs 0488 · Pagaments amb Stripe (exemple mínim)

Exemple del recurs **«Cobrar amb Stripe des d'una web React»** del mòdul 0488 Desenvolupament d'interfícies (DAM2, Prat FP).

Una botiga d'un sol producte feta amb **React 19 + TypeScript + Vite** i un **servidor Express** d'un sol fitxer que parla amb **Stripe Checkout** (pàgina de pagament allotjada per Stripe). Tot funciona a la **sandbox** de Stripe: no es cobra res de debò.

## Què cal

- Node.js 20 o superior.
- Un compte gratuït de Stripe (només correu, nom, país i contrasenya) i la **clau secreta de la sandbox** (`sk_test_...`), que és a *Developers > API keys*.

## Arrencar-lo

**A Windows:** `prepara-classe.bat` instal·la els paquets abans de la classe (no cal la clau). Després, doble clic a `arrenca.bat`. La primera vegada crea el `.env` i l'obre perquè hi enganxis la clau; la segona instal·la els paquets, engega el servidor i la web i obre el navegador.

**A mà (qualsevol sistema):**

```bash
cp .env.example .env      # i posa-hi STRIPE_SECRET_KEY=sk_test_...
npm install
npm run dev               # servidor a :3001 i web a :5173
```

Obre `http://localhost:5173`.

## Targetes de prova

| Targeta | Resultat |
|---|---|
| `4242 4242 4242 4242` | Pagament acceptat |
| `4000 0025 0000 3155` | Demana autenticació (3D Secure) |
| `4000 0000 0000 9995` | Pagament rebutjat |

Data de caducitat: qualsevol data futura. CVC: tres xifres qualssevol.

## Fitxers

```
servidor.mjs     el servidor: POST /api/pagar (crea la sessió) i GET /api/sessio/:id (la consulta)
src/App.tsx      la web: botó de pagar i pantalla de resultat
src/main.tsx     punt d'entrada de React
src/index.css    estils
vite.config.ts   proxy /api -> servidor
.env.example     plantilla del .env (la clau secreta)
```

## Regles d'or

1. La **clau secreta** només és al servidor (`.env`), mai a React ni a GitHub.
2. El **preu** el posa el servidor.
3. Que la URL porti `session_id` **no demostra res**: qui diu si s'ha pagat és Stripe, i ho preguntem des del servidor.
