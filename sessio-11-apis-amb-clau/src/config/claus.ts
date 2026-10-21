// ─────────────────────────────────────────────────────────────
// Totes les claus de l'aplicació es llegeixen AQUÍ i només aquí.
// Quan fas «npm run dev», Vite llegeix el fitxer .env i posa dins
// d'import.meta.env les variables que comencen per VITE_.
// Si una variable no existeix, ?? '' la deixa com a text buit.
// ─────────────────────────────────────────────────────────────

// OpenWeather: aquesta clau anirà DINS LA URL (paràmetre appid)
export const CLAU_OPENWEATHER = import.meta.env.VITE_OWM_KEY ?? '';

// TMDB: aquest token anirà a la CAPÇALERA Authorization
export const TOKEN_TMDB = import.meta.env.VITE_TMDB_TOKEN ?? '';
