import { test, expect } from '../../fixtures/test-fixtures';
import { PRODUCTS, CHECKOUT_DATA, ERROR_MESSAGES } from '../../utils/test-data';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ authenticatedPage, cartPage }) => {
    // Add item and navigate to checkout
    await authenticatedPage.addToCart(PRODUCTS.backpack);
    await authenticatedPage.goToCart();
    await cartPage.checkout();
  });

  test('should complete full checkout flow successfully', async ({
    checkoutPage,
    checkoutCompletePage,
  }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.valid.firstName,
      CHECKOUT_DATA.valid.lastName,
      CHECKOUT_DATA.valid.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.expectOnStepTwo();
    await checkoutPage.expectSummaryVisible();
    await checkoutPage.finish();
    await checkoutCompletePage.expectOrderComplete();
  });

  test('should display error when all checkout fields are empty', async ({
    checkoutPage,
  }) => {
    await checkoutPage.continue();
    await checkoutPage.expectError(ERROR_MESSAGES.firstNameRequired);
  });

  test('should display error when last name is missing', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.valid.firstName,
      '',
      ''
    );
    await checkoutPage.continue();
    await checkoutPage.expectError(ERROR_MESSAGES.lastNameRequired);
  });

  test('should display error when postal code is missing', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.valid.firstName,
      CHECKOUT_DATA.valid.lastName,
      ''
    );
    await checkoutPage.continue();
    await checkoutPage.expectError(ERROR_MESSAGES.postalCodeRequired);
  });

  test('should cancel checkout and return to cart', async ({
    checkoutPage,
  }) => {
    await checkoutPage.cancel();
    await expect(checkoutPage.page).toHaveURL(/cart\.html/);
  });

  test('should show order summary with correct item on step two', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_DATA.valid.firstName,
      CHECKOUT_DATA.valid.lastName,
      CHECKOUT_DATA.valid.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.expectOnStepTwo();

    const summaryItemCount = await checkoutPage.summaryItems.count();
    expect(summaryItemCount).toBe(1);
    await expect(checkoutPage.page.locator('[data-test="inventory-item-name"]')).toHaveText(PRODUCTS.backpack);
  });
});
