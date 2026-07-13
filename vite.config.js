import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from custom domain root: https://nathrahdata.com
export default defineConfig({
  base: '/',
  plugins: [react()],
});
