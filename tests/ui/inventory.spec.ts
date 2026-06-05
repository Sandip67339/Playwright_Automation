import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS, SORT_OPTIONS } from '../../utils/test-data';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture auto-logs in
  });

  test('should display all 6 products on inventory page', async ({ authenticatedPage }) => {
    const productNames = await authenticatedPage.getProductNames();
    expect(productNames).toHaveLength(6);
  });

  test('should sort products by name A to Z', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(SORT_OPTIONS.nameAZ);
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('should sort products by name Z to A', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(SORT_OPTIONS.nameZA);
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(SORT_OPTIONS.priceLowHigh);
    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy(SORT_OPTIONS.priceHighLow);
    const prices = await authenticatedPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should navigate to product detail page', async ({ authenticatedPage }) => {
    await authenticatedPage.openProduct(PRODUCTS.backpack);
    await expect(authenticatedPage.page).toHaveURL(/inventory-item/);
    await expect(authenticatedPage.page.locator('[data-test="inventory-item-name"]')).toHaveText(PRODUCTS.backpack);
  });
});
