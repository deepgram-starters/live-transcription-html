import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: parseInt(process.env.VITE_PORT || '8081'),
    strictPort: true,
    open: false,
    host: true,
    proxy: {
      '/api/metadata': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 4173,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});

