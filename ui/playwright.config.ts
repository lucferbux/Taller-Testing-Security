import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 5000,
  testDir: 'src/__tests__',

  reporter: 'html',
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: [
    {
      command: 'cd ../api && npm run dev',
      port: 4000,
      timeout: 120 * 1000
    },
    {
      command: 'npm run dev',
      port: 5173,
      timeout: 120 * 1000
    }
  ],
  use: {
    baseURL: 'http://localhost:5173'
  }
});
