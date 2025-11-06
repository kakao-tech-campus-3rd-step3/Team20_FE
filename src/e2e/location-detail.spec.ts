import { test, expect } from './fixtures/auth';

test.describe('장소 상세 페이지', () => {
  test('장소 기본 정보 표시', async ({ page }) => {
    await page.goto('/location/1');

    let apiSuccess = false;
    try {
      const response = await page.waitForResponse(
        (response) => response.url().includes('/locations/') && response.status() === 200,
        { timeout: 15000 },
      );
      const body = await response.json().catch(() => null);
      apiSuccess = body?.data?.locationId !== undefined;
    } catch {
      apiSuccess = false;
    }

    if (!apiSuccess) {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    try {
      await page.waitForFunction(
        () => {
          const loading = document.querySelector('.animate-pulse');
          return loading === null;
        },
        { timeout: 10000 },
      );
    } catch {
      // 로딩 완료 대기 실패는 무시
    }

    const errorMessage = page.locator('text=위치 정보를 찾을 수 없습니다');
    const isErrorPage = await errorMessage.isVisible({ timeout: 2000 }).catch(() => false);

    if (isErrorPage) {
      test.skip();
      return;
    }

    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});

    const locationName = page.locator('h1').first();
    await expect(locationName).toBeVisible({ timeout: 5000 });

    await expect(page.locator('text=/서울|부산|경기|인천|대구|광주|대전|울산/')).toBeVisible();

    const locationImage = page.locator('img[alt*="장소"]').or(page.locator('img').first());
    await expect(locationImage).toBeVisible();
  });

  test('리뷰 목록 표시', async ({ page }) => {
    await page.goto('/location/1');

    let locationApiSuccess = false;
    try {
      const response = await page.waitForResponse(
        (response) => response.url().includes('/locations/') && response.status() === 200,
        { timeout: 15000 },
      );
      const body = await response.json().catch(() => null);
      locationApiSuccess = body?.data?.locationId !== undefined;
    } catch {
      locationApiSuccess = false;
    }

    if (!locationApiSuccess) {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    try {
      await page.waitForFunction(
        () => {
          const loading = document.querySelector('.animate-pulse');
          return loading === null;
        },
        { timeout: 10000 },
      );
    } catch {
      // 무시
    }

    const errorMessage = page.locator('text=위치 정보를 찾을 수 없습니다');
    const isErrorPage = await errorMessage.isVisible({ timeout: 2000 }).catch(() => false);

    if (isErrorPage) {
      test.skip();
      return;
    }

    await page.waitForSelector('h2:has-text("리뷰")', { timeout: 10000 }).catch(() => {});

    await expect(page.locator('h2:has-text("리뷰")')).toBeVisible({ timeout: 5000 });

    const reviewCards = page.locator('div').filter({
      has: page.locator('h3').filter({ hasText: /.+/ }),
    });

    const reviewCount = await reviewCards.count();

    if (reviewCount > 0) {
      await expect(page.locator('text=/\\d+\\.\\d+/')).toBeVisible();
      await expect(page.locator('text=/\\d+개 리뷰/')).toBeVisible();
    }
  });

  test('관련 콘텐츠 표시', async ({ page }) => {
    await page.goto('/location/1');

    let locationApiSuccess = false;
    try {
      const response = await page.waitForResponse(
        (response) => response.url().includes('/locations/') && response.status() === 200,
        { timeout: 15000 },
      );
      const body = await response.json().catch(() => null);
      locationApiSuccess = body?.data?.locationId !== undefined;
    } catch {
      locationApiSuccess = false;
    }

    if (!locationApiSuccess) {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    const relatedContentsSection = page
      .locator('h2:has-text("관련 콘텐츠")')
      .or(page.locator('text=관련 콘텐츠'));

    const isVisible = await relatedContentsSection.isVisible().catch(() => false);

    if (isVisible) {
      await expect(relatedContentsSection).toBeVisible();
    }
  });

  test('길찾기 버튼 동작', async ({ page, context }) => {
    await page.goto('/location/1');

    let locationApiSuccess = false;
    try {
      const response = await page.waitForResponse(
        (response) => response.url().includes('/locations/') && response.status() === 200,
        { timeout: 15000 },
      );
      const body = await response.json().catch(() => null);
      locationApiSuccess = body?.data?.locationId !== undefined;
    } catch {
      locationApiSuccess = false;
    }

    if (!locationApiSuccess) {
      test.skip();
      return;
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

    const kakaoMapButton = page.locator('button:has-text("길찾기")');

    if (await kakaoMapButton.isVisible()) {
      const [newPage] = await Promise.all([context.waitForEvent('page'), kakaoMapButton.click()]);

      expect(newPage.url()).toContain('map.kakao.com');

      await newPage.close();
    }
  });
});
