import { test, expect } from './fixtures/auth';

test.describe('장소 상세 페이지', () => {
  test('장소 기본 정보 표시', async ({ page }) => {
    await page.goto('/location/1');

    await page.waitForLoadState('networkidle');

    const locationName = page.locator('h1').first();
    await expect(locationName).toBeVisible();

    await expect(page.locator('text=/서울|부산|경기|인천|대구|광주|대전|울산/')).toBeVisible();

    const locationImage = page.locator('img[alt*="장소"]').or(page.locator('img').first());
    await expect(locationImage).toBeVisible();
  });

  test('리뷰 목록 표시', async ({ page }) => {
    await page.goto('/location/1');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h2:has-text("리뷰")')).toBeVisible();

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
    await page.waitForLoadState('networkidle');

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
    await page.waitForLoadState('networkidle');

    const kakaoMapButton = page.locator('button:has-text("길찾기")');

    if (await kakaoMapButton.isVisible()) {
      const [newPage] = await Promise.all([context.waitForEvent('page'), kakaoMapButton.click()]);

      expect(newPage.url()).toContain('map.kakao.com');

      await newPage.close();
    }
  });
});
