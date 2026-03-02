import { defineConfig, devices } from '@playwright/test';

const E2E_PORT = process.env.E2E_PORT || '3765';
const baseURL = `http://localhost:${E2E_PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? 'dot' : 'list',
  timeout: 45000,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'api', testMatch: /api\.spec\.ts/ },
    { name: 'ui', testMatch: /app\.spec\.ts/, dependencies: ['api'] },
  ],
  webServer: {
    command: 'npm run build:ui && node mcpServer.js --streamable-http',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      ...process.env,
      PORT: E2E_PORT,
      E2E_PORT,
      AUTH_DATA_PATH: './e2e-temp-data',
      DOCS_USER: 'admin',
      DOCS_PASS: 'changeme',
    },
  },
});
