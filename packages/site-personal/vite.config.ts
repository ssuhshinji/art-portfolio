import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace base with your GitHub repo name if deploying as project page, e.g. '/portfolio/'
  base: '/',
  resolve: {
    alias: {
      '@portfolio/shared': path.resolve(__dirname, '../shared')
    }
  }
});
