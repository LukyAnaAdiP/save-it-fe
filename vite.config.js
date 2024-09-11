import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://c096-182-253-85-111.ngrok-free.app/',
        changeOrigin: true
      }
    }
  }
})
