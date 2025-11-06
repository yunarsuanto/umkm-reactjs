import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi agar alias dan environment variable tetap seperti CRA
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    open: true,
    // pastikan fallback ke index.html untuk react-router
    fs: {
      allow: ["."],
    },
  },
});
