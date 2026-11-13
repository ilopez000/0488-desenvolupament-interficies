import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El port ha de ser SEMPRE el 5173: és l'origen que hem autoritzat a Google
// Cloud (http://localhost:5173). Amb strictPort, si el port està ocupat,
// Vite s'atura en comptes de canviar-lo per un altre que Google no coneix.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
})
