import { test, expect } from '../../fixtures/test-fixtures';
import { USERS, ERROR_MESSAGES } from '../../utils/test-data';

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with standard user', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await loginPage.expectSuccessfulLogin();
  });

  test('should display error for locked out user', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await loginPage.expectError(ERROR_MESSAGES.lockedOut);
  });

  test('should display error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    await loginPage.expectError(ERROR_MESSAGES.invalidCredentials);
  });

  test('should display error when username is empty', async ({ loginPage }) => {
    await loginPage.login('', USERS.standard.password);
    await loginPage.expectError(ERROR_MESSAGES.usernameRequired);
  });

  test('should display error when password is empty', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, '');
    await loginPage.expectError(ERROR_MESSAGES.passwordRequired);
  });

  test('should display error when both fields are empty', async ({ loginPage }) => {
    await loginPage.login('', '');
    await loginPage.expectError(ERROR_MESSAGES.usernameRequired);
  });
});
