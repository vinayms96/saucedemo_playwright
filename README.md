# saucedemo_playwright

A comprehensive end-to-end (E2E) test automation suite for the [SauceDemo](https://www.saucedemo.com) web application, built with **Playwright** and **TypeScript**. This project follows the **Page Object Model (POM)** design pattern to test the complete user journey including login, product browsing, cart management, and order placement.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Docker Support](#docker-support)
- [Test Suites](#test-suites)
- [Page Objects](#page-objects)
- [Test Data](#test-data)
- [Custom Fixtures](#custom-fixtures)
- [CI/CD Integration](#cicd-integration)
- [Browser Configuration](#browser-configuration)
- [Troubleshooting](#troubleshooting)

## Overview

This project provides automated testing for the SauceDemo e-commerce application, validating critical user flows and application functionality. It uses Playwright Test as the testing framework, which offers:

- Cross-browser testing capabilities
- Powerful debugging tools (Inspector, Trace Viewer)
- Parallel test execution
- Built-in HTML test reporting
- TypeScript support for type-safe test code

**Target URL:** https://www.saucedemo.com

## Project Structure

```
saucedemo_playwright/
├── tests/                          # Test specifications
│   ├── login.spec.ts              # Login functionality tests
│   ├── listing.spec.ts            # Product listing/inventory tests
│   ├── cart.spec.ts               # Shopping cart tests
│   ├── minicart.spec.ts           # Mini cart badge tests
│   └── orders.spec.ts             # Complete order workflow tests
├── pages/                          # Page Object Model implementations
│   ├── login.page.ts              # Login page object
│   ├── listing.page.ts            # Product listing page object
│   ├── cart.page.ts               # Cart page object
│   ├── checkout.page.ts           # Checkout page object
│   ├── confirmation.page.ts       # Order confirmation page object
│   └── minicart.page.ts           # Mini cart page object
├── fixtures/                       # Custom test fixtures
│   └── login-page.ts              # Pre-authenticated login fixture
├── utils/                          # Utility functions and helpers
│   ├── credentials.ts             # Credential management
│   └── enums.ts                   # Enum definitions
├── data/                           # Test data files
│   └── user_data.ts               # User credentials and test data
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── package-lock.json              # Locked dependency versions
├── Dockerfile                     # Docker image for containerised test runs
├── docker-playwright-report/      # HTML report generated from Docker run
├── playwright-report/             # HTML test reports (generated)
├── test-results/                  # Test execution results (generated)
└── README.md                       # This file
```

## Features

- **Comprehensive Test Coverage:** Tests for login (multiple user types), inventory management, cart operations, and complete order flows
- **Page Object Model:** Clean separation of page logic and test logic for maintainability
- **TypeScript Support:** Type-safe test code with full IDE support
- **Custom Fixtures:** Pre-configured test context with automatic login/logout
- **Multiple User Types:** Tests with various user accounts including standard, locked-out, problem, and performance-glitch users
- **Parallel Execution:** Tests run in parallel for faster feedback
- **HTML Reporting:** Beautiful HTML reports with screenshots and test traces
- **CI/CD Ready:** GitHub Actions integration for automated testing on pull requests and commits
- **Docker Support:** Containerised test execution via the official Playwright Docker image
- **Multi-Browser:** Chromium and Firefox enabled by default

## Prerequisites

- **Node.js:** v20 or higher
- **npm:** v10 or higher
- **Git:** For version control
- **Docker** *(optional):* For containerised test runs

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinayms96/saucedemo_playwright.git
   cd saucedemo_playwright
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Configuration

### Environment Variables

Set the following environment variable before running tests:

```bash
export SAUCE_DEMO_PASSWORD=<your_password>
```

If `SAUCE_DEMO_PASSWORD` is not set, the password defaults to an empty string and tests requiring authentication will fail. Always ensure this variable is set in both local and CI environments.

### Playwright Configuration

The `playwright.config.ts` file contains:

- **Base URL:** https://www.saucedemo.com
- **Default Timeout:** 30 seconds per action (default)
- **Browsers:** Chromium and Firefox (both enabled by default)
- **Parallel Execution:** Enabled by default
- **Reporters:** HTML reporter for visual test reports

**Local Execution:**
- No test retries
- Unlimited workers for parallel execution

**CI/CD Execution (GitHub Actions):**
- 2 retries for failed tests
- 5 workers for parallel execution
- Trace collection on first retry for debugging
- Strict mode enabled (forbidOnly check)

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in Headed Mode (Browser UI Visible)

```bash
npx playwright test --headed
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

### Run Tests Matching a Pattern

```bash
npx playwright test --grep "login"
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with UI Mode (Recommended for Development)

```bash
npx playwright test --ui
```

### Generate and View HTML Report

```bash
npx playwright show-report
```

### Run Tests in Single Worker Mode (Sequential)

```bash
npx playwright test --workers=1
```

## Docker Support

The project includes a `Dockerfile` based on the official Playwright image, which provides a fully configured environment with all required browsers pre-installed.

### Build the Docker Image

```bash
docker build -t saucedemo-playwright .
```

### Run Tests in Docker

```bash
docker run --rm \
  -e SAUCE_DEMO_PASSWORD=<your_password> \
  saucedemo-playwright
```

### Extract the HTML Report from Docker

```bash
docker run --rm \
  -e SAUCE_DEMO_PASSWORD=<your_password> \
  -v $(pwd)/docker-playwright-report:/app/playwright-report \
  saucedemo-playwright
```

The `docker-playwright-report/` directory in this repository contains an HTML report from a previous Docker run and can be opened in any browser.

## Test Suites

### 1. Login Tests (`tests/login.spec.ts`)

Tests user authentication and login functionality:

- **Standard User Login:** Valid credentials login and redirect to inventory page
- **Fixture Login + Logout:** Login via the pre-authenticated fixture, verifying automatic logout
- **Locked Out User:** Verifies the correct error message is displayed for locked accounts
- **Problem User:** Logs in and verifies all product images share the broken placeholder `src`
- **Performance Glitch User:** Logs in and confirms the page load time is measurable

**Total Tests:** 5

### 2. Product Listing Tests (`tests/listing.spec.ts`)

Tests product inventory and listing page functionality:

- **Product Count:** Verifies exactly 6 products are displayed on the inventory page
- **Sorting — Name:** Validates A→Z default order and Z→A after selecting the dropdown option
- **Sorting — Price:** Validates low-to-high and high-to-low price sorting via dropdown

**Total Tests:** 3

### 3. Shopping Cart Tests (`tests/cart.spec.ts`)

Tests shopping cart operations:

- **Remove from Cart:** Adds two products and verifies they are fully removed via the cart page remove buttons
- **Cart Contents Verification:** Adds two products and cross-checks names, descriptions, and prices against the listing page values

**Total Tests:** 2

### 4. Mini Cart Tests (`tests/minicart.spec.ts`)

Tests mini cart badge and quick interactions:

- **Badge Add & Remove:** Verifies the badge is absent initially, shows `2` after adding products, and disappears after removing them from the listing page
- **Badge After Add:** Verifies the badge count updates to `2` when two products are added to cart

**Total Tests:** 2

### 5. Order Workflow Tests (`tests/orders.spec.ts`)

Tests the complete end-to-end order placement workflow:

- **Complete Order Flow:**
  - Login via fixture
  - Capture product descriptions and prices from the listing page
  - Add products to cart and navigate to the cart page
  - Proceed to checkout and fill in personal information
  - Verify checkout overview (product details, payment info, shipping info, item total, tax, and grand total)
  - Complete the order and verify the confirmation message
  - Navigate back to the products page

**Total Tests:** 1 comprehensive workflow test

**Overall Test Count:** 13 individual tests × 2 browsers = 26 test runs

## Page Objects

### LoginPage (`pages/login.page.ts`)

Handles all login-related interactions:

- `login(username, password)` — Fill credentials and submit the login form
- `logout()` — Open the hamburger menu and click the logout link
- `getPageTitle()` — Return the page logo text
- `isHamburgerMenuVisible()` — Check whether the user is currently logged in
- Locators: `username`, `password`, `login_button`, `hamburger_menu`, `logout_link`, `locked_out_error`

### ListingPage (`pages/listing.page.ts`)

Manages product listing page interactions:

- `addToCart(productName)` — Return the add-to-cart locator for the named product
- `removeFromCart(productName)` — Return the remove-from-cart locator for the named product
- `getProductCards()` — Return a locator for all inventory item cards
- `getProductCount()` — Return the number of products displayed
- `getProductNames()` — Return an array of all product name strings
- `getProductDescriptions()` — Return an array of all product description strings
- `getProductPrices()` — Return an array of all product prices as numbers
- Locators: `page_title`, `product_images`, `product_cards`, `product_names`, `product_descriptions`, `product_prices`, `sort_dropdown`

### CartPage (`pages/cart.page.ts`)

Handles shopping cart operations:

- `removeProduct(productName)` — Return the remove-button locator for the named product
- Locators: `product_cards`, `product_names`, `product_descriptions`, `product_prices`, `checkout_button`

### CheckoutPage (`pages/checkout.page.ts`)

Manages the checkout process:

- `fillCheckoutInformation(firstName, lastName, postalCode)` — Fill in the checkout form fields
- Locators: `checkout_step_title`, `first_name_input`, `last_name_input`, `postal_code_input`, `continue_button`, `finish_button`, `product_names`, `product_descriptions`, `product_prices`, `payment_information_label`, `payment_information_value`, `shipping_information_label`, `shipping_information_value`, `item_total_label`, `tax_label`, `total_label`

### ConfirmationPage (`pages/confirmation.page.ts`)

Validates order completion:

- Locators: `confirmation_header`, `confirmation_message`, `back_home_button`

### MiniCartPage (`pages/minicart.page.ts`)

Handles mini cart badge and navigation:

- `minicartBadge()` — Return the cart item count badge locator
- `minicartIcon()` — Return the cart icon container locator

## Test Data

### Test Users

The project includes multiple test user accounts defined in `data/user_data.ts`:

| Username | Type | Purpose |
|----------|------|---------|
| `standard_user` | Standard | Valid user for normal workflows |
| `locked_out_user` | Locked | Tests locked account behavior |
| `problem_user` | Problem | Tests with visual inconsistencies |
| `performance_glitch_user` | Performance | Tests with slow response times |
| `error_user` | Error | Tests error handling |
| `visual_user` | Visual | Tests visual regression scenarios |

### Payment Information

Test payment and order data (`data/user_data.ts`):

```typescript
export const paymentInfo = {
    first_name: 'John',
    last_name: 'Doe',
    postal_code: '12345',
    credit_card: 'SauceCard #31337',
    shipping: 'Free Pony Express Delivery!',
    tax: '$2.08'
}
```

### Credentials Management

The `utils/credentials.ts` utility provides:

- `getUserCredentials(userType)` — Returns `{ username, password }` for the given user type
- Password is read from the `SAUCE_DEMO_PASSWORD` environment variable
- User types are type-safe: only keys defined in `data/user_data.ts` are accepted

## Custom Fixtures

### Login Fixture (`fixtures/login-page.ts`)

A pre-configured test fixture that automatically logs in before each test and logs out after:

**Usage:**

```typescript
import { test } from '../fixtures/login-page';

test('test with automatic login', async ({ loginPage, page }) => {
  // loginPage is already authenticated and on the inventory page
});
```

**Features:**

- Navigates to `/` and logs in as `standard_user` before the test
- Asserts that the inventory page title reads `Products` and the URL matches `/inventory.html`
- Provides the authenticated `loginPage` instance to the test
- After the test completes, calls `logout()` and asserts the user is returned to the login page

## CI/CD Integration

### GitHub Actions Workflow

The project includes an automated CI/CD pipeline (`.github/workflows/playwright.yml`) that:

- **Triggers on:** Push to `main` branch, Pull requests to `main` branch
- **Runtime:** Node.js 24
- **Steps:**
  1. Install dependencies (`npm ci`)
  2. Install Playwright browsers (`npx playwright install`)
  3. Run all tests (`npx playwright test`)
  4. Upload HTML reports as artifacts (30-day retention)
- **Environment Variables:** `SAUCE_DEMO_PASSWORD` from GitHub Secrets (`prod` environment)

### Setting Up CI/CD

1. Push code to a GitHub repository
2. Add the password secret:
   - Go to GitHub repository Settings → Secrets and variables → Actions
   - Add new secret: `SAUCE_DEMO_PASSWORD`
   - Set value to the SauceDemo password
3. Push to `main` branch — tests will automatically run

## Browser Configuration

### Currently Enabled

- **Chromium:** Desktop Chrome configuration
- **Firefox:** Desktop Firefox configuration

### Optional Browsers (Commented in Config)

To enable additional browsers, uncomment the respective configuration in `playwright.config.ts`:

#### Webkit (Safari)

```typescript
{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
```

#### Mobile Chrome

```typescript
{ name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
```

#### Mobile Safari

```typescript
{ name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
```

### Running Tests on a Specific Browser

```bash
# Run only on Chromium
npx playwright test --project=chromium

# Run only on Firefox
npx playwright test --project=firefox
```

## Troubleshooting

### Tests Failing Due to Network Issues

- Ensure you have stable internet connectivity to https://www.saucedemo.com
- Increase timeout values in `playwright.config.ts` if needed

### Browser Installation Issues

```bash
# Reinstall Playwright browsers with system dependencies
npx playwright install --with-deps

# For a specific browser
npx playwright install chromium
```

### Trace Viewer for Debugging

Failed tests automatically collect traces on the first retry. View them with:

```bash
npx playwright show-trace test-results/<trace-file>.zip
```

### Clear Test Results

```bash
rm -rf test-results/ playwright-report/
```

### Run with Maximum Verbosity

```bash
npx playwright test --reporter=list
```

### Check Playwright Version

```bash
npx playwright --version
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.58.2 | Test framework and assertions |
| `@types/node` | ^25.2.3 | TypeScript Node.js type definitions |
| `typescript` | ^5.9.3 | TypeScript compiler |

## Best Practices

1. **Use Page Objects:** Always interact with pages through page object methods, not direct selectors
2. **Meaningful Test Names:** Use descriptive names for tests that explain what is being tested
3. **Test Independence:** Each test should be independent and not rely on other tests
4. **Data Management:** Use test data from `data/` directory, avoid hardcoding values
5. **Custom Fixtures:** Use the login fixture for tests requiring authentication
6. **Error Messages:** Add descriptive error messages in assertions
7. **Cleanup:** Always clean up after tests (logout, clear forms, etc.)

## Contributing

When adding new tests:

1. Create corresponding page objects for new pages/components
2. Follow the existing naming conventions (`<name>.page.ts`, `<name>.spec.ts`)
3. Add tests to the appropriate test suite file
4. Update this README with new test suite descriptions
5. Ensure all tests pass locally before pushing

## License

This project is licensed under the [MIT License](LICENSE).

## Contact & Support

For issues or questions:
- Check existing test cases for examples
- Review Playwright documentation: https://playwright.dev
- Open an issue at: https://github.com/vinayms96/saucedemo_playwright/issues
