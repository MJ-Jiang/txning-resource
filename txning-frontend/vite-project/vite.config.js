import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    globals: true,
  },
  server: {
    proxy: {
      '/channels': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/contents': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/dict': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
