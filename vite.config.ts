import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.io'],
  },
  preview: {
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.io'],
  },
});
