import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Un sol servidor de desenvolupament (5173) per a tot: React + el Worker (/api) + la base de dades D1.
//   npm run dev          → D1 LOCAL (una còpia a la carpeta .wrangler, sense compte de Cloudflare)
//   npm run dev:remota   → D1 REMOTA (la base de dades de debò del teu compte de Cloudflare)
export default defineConfig(({ mode }) => {
  // Llegim el .env per passar el MATEIX ID de client de Google al Worker
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const bdRemota = mode === 'remota'

  return {
    plugins: [
      react(),
      cloudflare({
        config: (config) => {
          config.vars = { ...config.vars, GOOGLE_CLIENT_ID: env.VITE_GOOGLE_CLIENT_ID ?? '' }
          if (bdRemota) config.d1_databases = config.d1_databases.map((bd) => ({ ...bd, remote: true }))
        },
      }),
    ],
    server: { port: 5173, strictPort: true }, // 5173: l'origen autoritzat a Google Cloud
  }
})
