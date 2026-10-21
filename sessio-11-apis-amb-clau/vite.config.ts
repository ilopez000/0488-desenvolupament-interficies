import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Aquest fitxer s'executa a Node (al servidor), NO al navegador.
  // loadEnv llegeix el .env. El '' final vol dir «carrega-les totes»,
  // també les que NO comencen per VITE_ (com TMDB_TOKEN).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      // PROXY (només per a l'exemple 4, i només amb «npm run dev»):
      // tot el que el navegador demani a /tmdb/... el servidor de Vite
      // ho reenvia a https://api.themoviedb.org/... afegint-hi el token.
      proxy: {
        '/tmdb': {
          target: 'https://api.themoviedb.org',
          changeOrigin: true, // per a TMDB, la petició ve de api.themoviedb.org
          rewrite: (cami) => cami.replace(/^\/tmdb/, ''), // treu el /tmdb del davant
          headers: {
            Authorization: `Bearer ${env.TMDB_TOKEN}`, // el token s'hi posa AQUÍ
          },
        },
      },
    },
  }
})
