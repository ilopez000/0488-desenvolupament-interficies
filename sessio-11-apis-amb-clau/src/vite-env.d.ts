/// <reference types="vite/client" />

// Diem a TypeScript quines variables tenim al fitxer .env.
// Així, quan escrius import.meta.env. VS Code te les suggereix.
// Porten ? perquè poden no existir (si encara no has creat el .env).
interface ImportMetaEnv {
  readonly VITE_OWM_KEY?: string;
  readonly VITE_TMDB_TOKEN?: string;
}
