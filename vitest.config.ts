/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'; // TODO: reenable later
import { defineConfig } from 'vitest/config';

const _dirname = path.dirname(fileURLToPath(import.meta.url));

// Separate config for Storybook testing
export default defineConfig({
  test: {
    projects: [
      // Regular unit tests
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./src/test-setup.ts'],
          include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
          globals: true,
        },
      },
      // // Storybook tests (TODO: reenable later)
      // {
      //   extends: true,
      //   plugins: [
      //     storybookTest({
      //       configDir: path.join(dirname, '.storybook'),
      //     }),
      //   ],
      //   test: {
      //     name: 'storybook',
      //     browser: {
      //       enabled: true,
      //       headless: true,
      //       provider: 'playwright',
      //       instances: [
      //         {
      //           browser: 'chromium',
      //         },
      //       ],
      //     },
      //     setupFiles: ['.storybook/vitest.setup.ts'],
      //   },
      // },
    ],
  },
});
