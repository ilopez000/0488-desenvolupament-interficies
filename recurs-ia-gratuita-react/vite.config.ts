import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Aquest fitxer s'executa a Node (al servidor), NO al navegador.
  // El '' final vol dir «carrega-les totes», també les que no porten VITE_.
  const env = loadEnv(mode, process.cwd(), '')

  // On és el servei d'IA. Si al .env no hi ha IA_URL, fem servir Groq.
  const servei = new URL(env.IA_URL || 'https://api.groq.com/openai/v1')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // El navegador demana /api/ia i el servidor de Vite ho reenvia a
        // https://api.groq.com/openai/v1/chat/completions afegint-hi la clau.
        '/api/ia': {
          target: servei.origin, // https://api.groq.com
          changeOrigin: true,
          rewrite: () => `${servei.pathname}/chat/completions`,
          headers: {
            Authorization: `Bearer ${env.IA_CLAU ?? ''}`, // la clau s'hi posa AQUÍ
          },
        },
      },
    },
  }
})
