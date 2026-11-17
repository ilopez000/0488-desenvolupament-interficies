// La variable GOOGLE_CLIENT_ID no és a wrangler.jsonc: la hi posa vite.config.ts a partir del .env.
// Aquí ho diem a TypeScript perquè env.GOOGLE_CLIENT_ID tingui tipus.
interface Env {
  GOOGLE_CLIENT_ID: string
}
