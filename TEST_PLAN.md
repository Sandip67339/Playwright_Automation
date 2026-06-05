# Test Plan: SauceDemo (UI) & ReqRes (API) Automation

This test plan outlines the scope, strategy, test cases, environment, risks, and execution details for the Playwright automation project covering [saucedemo.com](https://www.saucedemo.com) and [reqres.in](https://reqres.in).

---

## 1. Objectives & Scope

### 1.1 Objectives
* Design and implement robust, maintainable UI and API automated tests.
* Adhere to Page Object Model (POM) and clean-coding principles.
* Ensure high test reliability with zero hard-coded waits and proper async/await handling.
* Implement CI/CD integration using GitHub Actions and robust reporting.

### 1.2 In-Scope
* **UI Testing (SauceDemo)**: Login flows, inventory browsing, product listing/sorting, shopping cart operations, checkout flows, and sidebar navigation.
* **API Testing (ReqRes)**: User CRUD operations (GET list, GET single, POST create, PUT update, DELETE delete), registration, login, and error scenarios.
* **Negative Scenarios**: Invalid login credentials, empty required fields on checkout form, and bad/unauthorized requests on API endpoints.
* **Reporting & Execution**: Automatic HTML report generation, screenshot capture on failure, trace files on failure, parallel test execution, and CI workflow.

### 1.3 Out-of-Scope
* Visual layout validation (cross-browser layout pixel matching), except basic functional alignment.
* Real-payment testing or bank card transactions (as the site is a static mock ecommerce page).
* Load/performance testing beyond simple delay handling (via the `performance_glitch_user`).

---

## 2. Test Strategy

### 2.1 Framework & Stack
* **Language**: TypeScript
* **Test Runner**: Playwright Test
* **Design Pattern**: Page Object Model (POM) for UI tests; modular helper wrapper for API tests.
* **Data Management**: Externalized test data files (`utils/test-data.ts`) to enable data-driven testing.

### 2.2 Execution Strategy
* **Parallel Execution**: Enabled globally across tests (`fullyParallel: true`) to optimize execution speed.
* **CI/CD Integration**: Automatically runs on every push and pull request to the `main` or `develop` branches.
* **Retries & Flakiness**: Retries configured (1 retry in local/CI environments) to handle network anomalies.
* **Timeout Policies**: 
  * Global test timeout: 30 seconds
  * Element Action timeout: 10 seconds
  * Expect/Assertion timeout: 5 seconds

---

## 3. Test Environments & Configuration

| Environment | UI Base URL | API Base URL | Credentials |
|-------------|-------------|--------------|-------------|
| **Staging / Public Mock** | `https://www.saucedemo.com` | `https://reqres.in/api` | Loaded via `.env` (fallback values in `test-data.ts`) |

### Test Users (SauceDemo)
* `standard_user`: Happy path, standard flows.
* `locked_out_user`: Blocked account, negative path validation.
* `problem_user`: Page behaves weirdly (broken images, form issues).
* `performance_glitch_user`: Slow transitions, tests latency robustness.

---

## 4. Test Cases

### 4.1 UI Test Cases (SauceDemo)

#### Area 1: Authentication (Login Page)
* **TC-UI-01 (Positive)**: Successful login using valid standard user credentials.
* **TC-UI-02 (Negative)**: Attempt login with a locked-out user; verify error message displays: `"Sorry, this user has been locked out."`
* **TC-UI-03 (Negative)**: Attempt login with invalid username/password; verify error message displays: `"Username and password do not match any user in this service"`
* **TC-UI-04 (Negative)**: Attempt login with empty username; verify error message: `"Username is required"`
* **TC-UI-05 (Negative)**: Attempt login with empty password; verify error message: `"Password is required"`

#### Area 2: Product Catalog & Listing (Inventory Page)
* **TC-UI-06 (Positive)**: Verify that exactly 6 items are displayed on the inventory page.
* **TC-UI-07 (Positive)**: Sort products by Name A-Z and verify correct alphabetical order.
* **TC-UI-08 (Positive)**: Sort products by Name Z-A and verify correct reverse alphabetical order.
* **TC-UI-09 (Positive)**: Sort products by Price Low-High and verify correct ascending order.
* **TC-UI-10 (Positive)**: Sort products by Price High-Low and verify correct descending order.
* **TC-UI-11 (Positive)**: Click on a product name and verify transition to the correct product detail page.

#### Area 3: Shopping Cart (Cart Page)
* **TC-UI-12 (Positive)**: Add a single item to the cart and verify that the shopping cart badge count updates to `1`.
* **TC-UI-13 (Positive)**: Add multiple items (3) and verify that the shopping cart badge count updates to `3`.
* **TC-UI-14 (Positive)**: Remove an item directly from the inventory page; verify badge updates.
* **TC-UI-15 (Positive)**: Navigate to the Cart page and remove an item; verify it is removed from the cart list.
* **TC-UI-16 (Positive)**: Click "Continue Shopping" from the Cart page; verify redirect back to the Inventory page.

#### Area 4: Checkout Flow (Checkout Page)
* **TC-UI-17 (Positive)**: Fill valid checkout details, proceed to Step Two (Summary), click Finish, and verify the checkout complete confirmation screen.
* **TC-UI-18 (Negative)**: Attempt to proceed to Step Two with empty information fields; verify error: `"First Name is required"`.
* **TC-UI-19 (Negative)**: Fill First Name, leave Last Name and Zip empty; verify error: `"Last Name is required"`.
* **TC-UI-20 (Negative)**: Fill First & Last Name, leave Zip empty; verify error: `"Postal Code is required"`.
* **TC-UI-21 (Positive)**: Click Cancel from the checkout step one page; verify redirect back to the Cart page.

#### Area 5: Navigation & Menu
* **TC-UI-22 (Positive)**: Open sidebar burger menu, verify all navigation elements (All Items, About, Logout, Reset App State) are visible.
* **TC-UI-23 (Positive)**: Click Logout in sidebar; verify redirect to the Login page and session termination.
* **TC-UI-24 (Negative)**: Attempt to access `/inventory.html` directly without logging in; verify automatic redirect to the Login page.

---

### 4.2 API Test Cases (ReqRes.in)

#### Area 1: Users Endpoint
* **TC-API-01 (Positive)**: GET `/api/users?page=1` -> Verify 200 OK, paginated schema, and user object properties (id, email, first_name, last_name, avatar).
* **TC-API-02 (Positive)**: GET `/api/users/2` -> Verify 200 OK, response data matches expected properties for a single user.
* **TC-API-03 (Positive)**: POST `/api/users` -> Send name & job; verify 201 Created and that the response contains name, job, id, and createdAt timestamp.
* **TC-API-04 (Positive)**: PUT `/api/users/2` -> Update name & job; verify 200 OK and response contains updated fields and updatedAt timestamp.
* **TC-API-05 (Positive)**: DELETE `/api/users/2` -> Verify 204 No Content response.
* **TC-API-06 (Negative)**: GET `/api/users/99999` (non-existent ID) -> Verify 404 Not Found status and empty body `{}`.

#### Area 2: Auth & Register Endpoint
* **TC-API-07 (Positive)**: POST `/api/login` -> Verify 200 OK and valid session token returned.
* **TC-API-08 (Positive)**: POST `/api/register` -> Verify 200 OK, returns id and token.
* **TC-API-09 (Negative)**: POST `/api/login` with missing password -> Verify 400 Bad Request, returns error message: `"Missing password"`.
* **TC-API-10 (Negative)**: POST `/api/register` with missing password -> Verify 400 Bad Request, returns error message: `"Missing password"`.

---

## 5. Risks & Mitigation Strategies

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| **ReqRes API Rate Limiting / Down Time** | High | Use mock response fixtures or standard API retries. Playwright retries are configured in the config file to minimize transient test failures. |
| **Flaky/Slow Web Elements (SauceDemo)** | Medium | Use web-first assertions like `expect(locator).toBeVisible()` which auto-retry and wait instead of static timeouts (`waitForTimeout`). |
| **Credentials Exposure** | Low | Store credentials in `.env` and load them securely, utilizing local values as fallback only. Add `.env` to `.gitignore`. |
| **State Leakage (Cart State)** | Medium | Utilize fresh browser contexts for every test or clean up states using API/Reset sidebar action where sequential dependency isn't explicitly tested. |
