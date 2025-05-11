import { test } from '@playwright/test'

test('test submission', async ({ page }) => {
  await page.goto('http://localhost:3000/api/auth/signin')
  await page.getByRole('textbox', { name: 'name' }).fill('test')
  await page
    .getByRole('button', { name: 'Sign in with Mocked GitHub' })
    .click({ force: true })

  const nonce =
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .slice(0, 6) || 'nonce'

  await page.locator('#text').fill(nonce)
  await page.getByRole('button', { name: 'Submit' }).click({ force: true })
  await page.waitForSelector(`text=${nonce}`)
})
