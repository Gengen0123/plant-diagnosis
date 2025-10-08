import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/js/app.jsx'], refresh: true }),
    react(),
  ],
  server: {
    host: true,       // Docker越しでもOKにする
    port: 5173,       // ← 固定
    hmr: { host: 'localhost', port: 5173 }, // ← HMR先も固定
  },
})
