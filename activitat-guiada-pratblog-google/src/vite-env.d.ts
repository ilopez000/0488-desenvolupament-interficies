/// <reference types="vite/client" />

// Tipus de les variables del fitxer .env que fa servir el projecte
interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID?: string
  readonly VITE_ADMINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
