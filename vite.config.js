import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-dirs',
      closeBundle() {
        for (const dir of ['html', 'assets', 'css', 'js']) {
          cpSync(dir, `dist/${dir}`, { recursive: true });
        }
      },
    },
  ],
});
