/// <reference types="vitest/config" />

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: '/octowalrus-frontend/', // Set base for GitHub Pages
  plugins: [react()],
  optimizeDeps: {
    include: ['markdown-to-jsx', 'react', 'react-dom', 'react/jsx-runtime'],
    exclude: ['@storybook/test-runner'],
  },
  resolve: {
    alias: {
      '@assets': path.resolve(dirname, 'src/assets'),
      '@components': path.resolve(dirname, 'src/components'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Allow external connections (needed for Docker)
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setupTests.ts'],
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['src/setupTests.ts'],
          exclude: ['node_modules/**/*'], // TODO re-enable when working ['**/*.stories.*', 'node_modules/**/*'],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          // KNOWN ISSUE: React 19 + Storybook + Vitest browser mode compatibility
          // React hooks (useState, useContext) return null in containerized browser environment
          // causing unhandled errors but tests still pass. This is a known upstream issue.
          // Monitor: https://github.com/storybookjs/storybook/issues
          // and https://github.com/vitest-dev/vitest/issues for resolution
        },
      },
    ],
  },
});
