import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',

        devOptions: {
          enabled: false,
        },

        manifest: {
          name: 'Yokila',
          short_name: 'Yokila',
          start_url: '/',
          display: 'standalone',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          icons: [
            { src: '/yokila-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/yokila-512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
      }),

    ],

    resolve: {
      alias: {
        src: '/src',
        '@': '/src',
      },
    },

    server: {
      port: Number(env.VITE_PORT) || 5173,
      open: true,
      fs: {
        allow: ['.'],
      },
    },

    build: {
      sourcemap: false,
    },
  }
})
