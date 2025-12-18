import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy configuration - IRIS backend এর সাথে connect করতে
    proxy: {
      '/sem': {
        target: 'http://localhost:52773',  // আপনার IRIS server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
