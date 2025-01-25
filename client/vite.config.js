import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      // Proxy API requests to the backend
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,             // Adjust the origin of the request
        secure: false,                  // If your backend uses HTTPS, set this to true
      },
    },
  },
})
