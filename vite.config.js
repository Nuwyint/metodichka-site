import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages: сайт находится в подпапке репозитория
  // https://<user>.github.io/<repo>/
  base: '/metodichka-site/',
  plugins: [react()],
})
