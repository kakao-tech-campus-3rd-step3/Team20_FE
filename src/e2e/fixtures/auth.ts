import { test as base } from '@playwright/test';

type AuthFixtures = {
  loginAsUser: () => Promise<void>;
};

const TEST_EMAIL = process.env.E2E_TEST_EMAIL || 'test@example.com';
const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || 'testpassword123';

export const test = base.extend<AuthFixtures>({
  loginAsUser: async ({ page }, provide) => {
    const loginFunction = async () => {
      await page.goto('/auth/login');

      await page.fill('input[type="email"]', TEST_EMAIL);
      await page.fill('input[type="password"]', TEST_PASSWORD);

      await Promise.all([
        page
          .waitForResponse((response) => response.url().includes('/users/login'), {
            timeout: 10000,
          })
          .catch(() => {}),
        page.click('button[type="submit"]'),
      ]);

      await page.waitForURL('/', { timeout: 5000 }).catch(() => {});
    };

    await provide(loginFunction);
  },
});

export { expect } from '@playwright/test';
