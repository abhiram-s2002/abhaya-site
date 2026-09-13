import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/abhaya-site/' : '/'),
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
})
