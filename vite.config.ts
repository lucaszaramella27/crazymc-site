import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
  },
  server: {
    allowedHosts: ['delegate-hurry-decal.ngrok-free.dev'],
    strictPort: true,
  },
  preview: {
    allowedHosts: ['delegate-hurry-decal.ngrok-free.dev'],
    strictPort: true,
  },
});
