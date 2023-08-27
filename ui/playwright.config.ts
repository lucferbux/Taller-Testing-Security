import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  timeout: 5000,
  testDir: 'src/__tests__',
  //testMatch: ['/e2e/**/*.spec.ts'],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],

  webServer:  {
        command: 'cd ../api && npm run dev',
        port: 4000
    }
});
