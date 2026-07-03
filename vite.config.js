import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'dist',
    // Warn if any chunk exceeds 600 kB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        // Vite 8 (rolldown) requires manualChunks to be a function
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('axios')) {
              return 'vendor-axios';
            }
          }
        },
      },
    },
  },

  server: {
    port: 5173,
    // Proxy API calls to backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  preview: {
    port: 4173,
  },
});
