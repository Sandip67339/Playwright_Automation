import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly resetLink: Locator;
  readonly closeSidebarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.resetLink = page.locator('#reset_sidebar_link');
    this.closeSidebarButton = page.locator('#react-burger-cross-btn');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async getProductNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allInnerTexts();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async addToCart(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      hasText: itemName,
    });
    await item.locator('button', { hasText: 'Add to cart' }).click();
  }

  async removeFromCart(itemName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      hasText: itemName,
    });
    await item.locator('button', { hasText: 'Remove' }).click();
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openSidebar() {
    await this.burgerMenuButton.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.openSidebar();
    await this.logoutLink.click();
  }

  async openProduct(name: string) {
    await this.page.locator('[data-test="inventory-item-name"]', { hasText: name }).click();
  }
}
