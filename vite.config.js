import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Custom domain (nathrahdata.com) is served from site root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
