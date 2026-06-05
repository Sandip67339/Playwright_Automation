import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture auto-logs in
  });

  test('should navigate to cart page and back', async ({ authenticatedPage }) => {
    await authenticatedPage.goToCart();
    await expect(authenticatedPage.page).toHaveURL(/cart\.html/);

    await authenticatedPage.page.locator('[data-test="continue-shopping"]').click();
    await expect(authenticatedPage.page).toHaveURL(/inventory\.html/);
  });

  test('should open sidebar menu and verify links', async ({ authenticatedPage }) => {
    await authenticatedPage.openSidebar();

    await expect(authenticatedPage.allItemsLink).toBeVisible();
    await expect(authenticatedPage.aboutLink).toBeVisible();
    await expect(authenticatedPage.logoutLink).toBeVisible();
    await expect(authenticatedPage.resetLink).toBeVisible();
  });

  test('should logout via sidebar menu', async ({ authenticatedPage, loginPage }) => {
    await authenticatedPage.logout();
    await expect(loginPage.page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should navigate to product detail and back', async ({ authenticatedPage }) => {
    const firstProductName = (await authenticatedPage.getProductNames())[0];
    await authenticatedPage.openProduct(firstProductName);
    await expect(authenticatedPage.page).toHaveURL(/inventory-item/);

    await authenticatedPage.page.locator('[data-test="back-to-products"]').click();
    await expect(authenticatedPage.page).toHaveURL(/inventory\.html/);
  });
});

test('should redirect unauthenticated user to login page', async ({ page }) => {
  await page.goto('/inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
