import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// PAS 3 · La web (5173) parla amb el nostre servidor (3001) a través del proxy de Vite.
// Així el navegador només veu una adreça i les credencials es queden al servidor.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:3001',
      '/simulador': 'http://localhost:3001',
    },
  },
})
