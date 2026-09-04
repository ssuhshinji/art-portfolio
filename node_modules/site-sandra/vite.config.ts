import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/art-portfolio/',
  resolve: {
    alias: {
      '@portfolio/shared': path.resolve(__dirname, '../shared')
    }
  }
});
