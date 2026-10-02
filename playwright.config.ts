import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import reportingLabs from './reporting-labs.config';


//npm install dotenv
//ENV=qa npx playwright test
const ENV = process.env.ENV || "qa";
console.log("Running tests on environment: ", ENV);
dotenv.config({ path: `config/.env.${ENV}`});

// In Powershell: $env:ENV="stage"; npx playwright test ./tests/web/loginPageFix.spec.ts
// In CMD: set ENV=stage && npx playwright test ./tests/web/loginPageFix.spec.ts

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 
  [
    ['list'],
    ['html', { outputFolder: "reports/html-report", open: "never" }],
    ["allure-playwright", {
      outputFolder: "allure-results",
      suiteTitle: true,
    }],
    ['reporting-labs', reportingLabs],
],
  
use: {
    //baseURL: 'https://naveenautomationlabs.com/opencart/',
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
