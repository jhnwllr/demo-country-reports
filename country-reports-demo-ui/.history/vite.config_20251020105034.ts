import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from the data directory
      allow: ['..', '.']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Copy data folder during build
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('data/images/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  // Handle Figma asset imports
  define: {
    'figma:asset': 'undefined'
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  // Include data folder as assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
})