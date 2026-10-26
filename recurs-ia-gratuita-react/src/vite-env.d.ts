/// <reference types="vite/client" />

// Variables del .env que el navegador pot llegir (només les que porten VITE_).
// La clau (IA_CLAU) NO hi és: el navegador no la veu mai.
interface ImportMetaEnv {
  readonly VITE_IA_MODEL?: string;
}
