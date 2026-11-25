import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    // Vitest blanks every stylesheet a test imports. src/look.test.ts reads
    // the stylesheet as text (?raw) and needs the text.
    css: { include: [/\?raw$/] },
  },
})
