import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages: https://yassine-fariss.github.io/sabon-spa/
  base: '/sabon-spa/',
  server: {
    port: 5173,
    host: true,
    watch: {
      // Exclude large binary assets from file watcher to prevent EBUSY crashes
      ignored: ['**/public/videos/**', '**/public/spa/**', '**/public/images/**', '**/assets/**'],
    },
  },
});
