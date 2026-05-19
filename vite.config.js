import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // base: '/vite-react-frontend-app/',
  resolve: {
    alias: { '@': '/src' },
  },
})
