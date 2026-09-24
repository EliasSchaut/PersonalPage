import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: {
    // `exec` + direct vite binary: pnpm 12 exits on SIGTERM without stopping its child,
    // which left the preview server running and Playwright waiting forever.
    command:
      'pnpm build && exec env ORIGIN=http://127.0.0.1:4173 node_modules/.bin/vite preview --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  testDir: 'e2e',
  testMatch: '**/*.e2e.ts',
  use: { baseURL: 'http://127.0.0.1:4173' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
