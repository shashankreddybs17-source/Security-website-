import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoBuildPlugin } from './scripts/seo-build.mjs';
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    seoBuildPlugin(loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL),
  ],
  server: { allowedHosts: ['terminal.local'] },
}));
