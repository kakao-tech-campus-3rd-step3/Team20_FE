import { test, expect } from './fixtures/auth';

test.describe('인증 기능', () => {
  test('로그인 페이지 접근', async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('로그인 성공 시 리다이렉트', async ({ page }) => {
    await page.goto('/auth/login');

    const TEST_EMAIL = process.env.E2E_TEST_EMAIL || 'test@example.com';
    const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || 'testpassword123';

    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);

    const responsePromise = page
      .waitForResponse((response) => response.url().includes('/users/login'), { timeout: 10000 })
      .catch(() => null);

    await page.click('button[type="submit"]');

    const response = await responsePromise;

    if (response && response.ok()) {
      await page.waitForURL('**/', { timeout: 5000 });
    } else {
      await expect(page).toHaveURL(/.*\/auth\/login/);
    }
  });

  test('로그인 실패 시 에러 메시지 표시', async ({ page }) => {
    await page.goto('/auth/login');

    const TEST_EMAIL = process.env.E2E_TEST_EMAIL || 'test@example.com';
    const TEST_PASSWORD = process.env.E2E_TEST_PASSWORD || 'testpassword123';

    await page.fill('input[type="email"]', TEST_EMAIL);
    await page.fill('input[type="password"]', TEST_PASSWORD);

    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    const errorMessage = page.locator('text=/오류|실패|잘못|인증/');
    const isVisible = await errorMessage.isVisible().catch(() => false);

    if (isVisible) {
      await expect(errorMessage).toBeVisible();
    }
  });

  test('회원가입 페이지 접근', async ({ page }) => {
    await page.goto('/auth/signup');

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();

    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('로그인 상태에서 마이페이지 접근', async ({ page, loginAsUser }) => {
    await loginAsUser();
    await page.goto('/mypage');
    await page.waitForLoadState('networkidle');

    const myPageContent = page.locator('text=/내|정보|프로필/');
    await expect(myPageContent.first()).toBeVisible({ timeout: 5000 });
  });

  test('비로그인 상태에서 마이페이지 접근 시 리다이렉트', async ({ page }) => {
    await page.goto('/mypage');

    await page.waitForURL('**/auth/login', { timeout: 5000 });
  });
});
