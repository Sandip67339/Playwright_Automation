import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS } from '../../utils/test-data';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    // authenticatedPage fixture auto-logs in
  });

  test('should add a single item to cart', async ({ authenticatedPage }) => {
    await authenticatedPage.addToCart(PRODUCTS.backpack);
    const badgeCount = await authenticatedPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should add multiple items and update cart badge', async ({ authenticatedPage }) => {
    await authenticatedPage.addToCart(PRODUCTS.backpack);
    await authenticatedPage.addToCart(PRODUCTS.bikeLight);
    await authenticatedPage.addToCart(PRODUCTS.boltShirt);
    const badgeCount = await authenticatedPage.getCartBadgeCount();
    expect(badgeCount).toBe(3);
  });

  test('should remove item from inventory page', async ({ authenticatedPage }) => {
    await authenticatedPage.addToCart(PRODUCTS.backpack);
    await authenticatedPage.addToCart(PRODUCTS.bikeLight);
    await authenticatedPage.removeFromCart(PRODUCTS.backpack);
    const badgeCount = await authenticatedPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should remove item from cart page', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addToCart(PRODUCTS.backpack);
    await authenticatedPage.addToCart(PRODUCTS.bikeLight);
    await authenticatedPage.goToCart();

    await cartPage.expectItemInCart(PRODUCTS.backpack);
    await cartPage.expectItemInCart(PRODUCTS.bikeLight);

    await cartPage.removeItem(PRODUCTS.backpack);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
  });

  test('should show correct items in cart after adding', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.addToCart(PRODUCTS.fleeceJacket);
    await authenticatedPage.addToCart(PRODUCTS.onesie);
    await authenticatedPage.goToCart();

    const cartItemNames = await cartPage.getCartItemNames();
    expect(cartItemNames).toContain(PRODUCTS.fleeceJacket);
    expect(cartItemNames).toContain(PRODUCTS.onesie);
    expect(cartItemNames).toHaveLength(2);
  });

  test('should continue shopping from cart page', async ({ authenticatedPage, cartPage }) => {
    await authenticatedPage.goToCart();
    await cartPage.continueShopping();
    await expect(authenticatedPage.page).toHaveURL(/inventory\.html/);
  });
});
