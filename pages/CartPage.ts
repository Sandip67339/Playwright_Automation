import { type page, type Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: page;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      hasText: itemName,
    });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async expectItemInCart(itemName: string) {
    await expect(this.page.locator('[data-test="inventory-item"]').filter({
      hasText: itemName,
    })).toBeVisible();
  }

  async expectCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }
}
