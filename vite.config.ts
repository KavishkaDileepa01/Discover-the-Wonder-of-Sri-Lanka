import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Use '/' for Netlify and most hosts. For GitHub Pages project sites only, set e.g. base: '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
