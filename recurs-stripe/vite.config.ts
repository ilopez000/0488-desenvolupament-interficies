import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// La web (5173) envia les peticions /api al nostre servidor (3001).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: { '/api': 'http://localhost:3001' },
  },
})
