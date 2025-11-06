import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi agar alias dan environment variable tetap seperti CRA
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    resolve: {
      alias: {
        src: '/src',
        '@': '/src',
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 5173,
      open: true,
      // pastikan fallback ke index.html untuk react-router
      fs: {
        allow: ["."],
      },
    },
  }
});
