import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Allow external access to device like mobile for testing responsiveness
    proxy: {
      '/api': 'http://localhost:8000',
    }
  },
  plugins: [react()],
})
