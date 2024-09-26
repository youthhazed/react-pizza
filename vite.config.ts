import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Вы можете изменить порт, если нужно
  },
  build: {
    outDir: 'dist', // Директория для сборки
  },
});
