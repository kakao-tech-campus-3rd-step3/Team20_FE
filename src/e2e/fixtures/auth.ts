import { test as base } from '@playwright/test';

type AuthFixtures = {
  loginAsUser: () => Promise<void>;
};

export const test = base.extend<AuthFixtures>({
  loginAsUser: async ({ page }, provide) => {
    const loginFunction = async () => {
      await page.goto('/auth/login');

      await page.fill('input[type="email"]', 'leehuiseok020412@gmail.com');
      await page.fill('input[type="password"]', 'password');

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
