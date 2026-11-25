import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    // Only this checkout's own tests. A copy of the repo nested inside it (a
    // git worktree under .claude/) brings its own tests and its own React.
    include: ['src/**/*.test.{ts,tsx}'],
    // Vitest blanks every stylesheet a test imports. src/look.test.ts reads
    // the stylesheet as text (?raw) and needs the text.
    css: { include: [/\?raw$/] },
  },
})
