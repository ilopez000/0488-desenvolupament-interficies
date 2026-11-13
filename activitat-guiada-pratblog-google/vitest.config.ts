import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Configuració de les proves (npm test). Les variables d'entorn són
// inventades: les proves no es connecten mai a Google.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/proves/configuracio.ts'],
    env: {
      VITE_GOOGLE_CLIENT_ID: 'id-de-prova.apps.googleusercontent.com',
      VITE_ADMINS: ' Admin@Prova.cat , ,segona@prova.cat',
    },
  },
})
