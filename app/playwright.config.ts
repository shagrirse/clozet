import { PlaywrightTestConfig, devices } from '@playwright/test'

const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000'
console.log(`ℹ️ Using base URL "${baseUrl}"`)

const config: PlaywrightTestConfig = {
  /* Run tests in files in parallel */
  fullyParallel: false,
  testDir: './test',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: baseUrl,
    headless: true,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }]],
}

export default config
