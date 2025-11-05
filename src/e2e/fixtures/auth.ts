import { test as base } from '@playwright/test';

type AuthFixtures = {
  loginAsUser: () => Promise<void>;
};

export const test = base.extend<AuthFixtures>({
  loginAsUser: async ({ page }, provide) => {
    const loginFunction = async () => {
      await page.goto('/auth/login');

      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');

      await page.click('button[type="submit"]');
      await page.waitForURL('/mypage', { timeout: 5000 }).catch(() => {});
    };

    await provide(loginFunction);
  },
});

export { expect } from '@playwright/test';
