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
│   ├── login-page.ts              # Login page object
│   ├── listing-page.ts            # Product listing page object
│   ├── cart-page.ts               # Cart page object
│   ├── checkout-page.ts           # Checkout page object
│   ├── confirmation-page.ts       # Order confirmation page object
│   └── mini-cart-page.ts          # Mini cart page object
├── fixtures/                       # Custom test fixtures
│   └── login-page.ts              # Pre-authenticated login fixture
├── utils/                          # Utility functions and helpers
│   ├── credentials.ts             # Credential management
│   └── enums.ts                   # Enum definitions
├── data/                           # Test data files
│   └── users.json                 # User credentials and test data
├── config/                         # Configuration files
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── package-lock.json              # Locked dependency versions
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
- **Chromium Browser:** Configured for desktop Chrome testing (Firefox and Safari support available)

## Prerequisites

- **Node.js:** v20 or higher
- **npm:** v10 or higher
- **Git:** For version control

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
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

Set the following environment variable for CI/CD environments:

```bash
export SAUCE_DEMO_PASSWORD=<your_password>
```

The password defaults to `secret_sauce` if not specified in the environment.

### Playwright Configuration

The `playwright.config.ts` file contains:

- **Base URL:** https://www.saucedemo.com
- **Default Timeout:** 30 seconds per action (default)
- **Browsers:** Chromium (Primary)
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

### Browser Configuration

The `playwright.config.ts` includes commented options for multi-browser testing:

```typescript
// Firefox
// { name: 'firefox', use: { ...devices['Desktop Firefox'] } },

// Webkit (Safari)
// { name: 'webkit', use: { ...devices['Desktop Safari'] } },

// Mobile Chrome
// { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },

// Mobile Safari
// { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
```

Uncomment any browser to enable multi-browser testing.

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

## Test Suites

### 1. Login Tests (`tests/login.spec.ts`)

Tests user authentication and login functionality:

- **Standard User Login:** Valid credentials login
- **Locked Out User:** Validation of locked account behavior
- **Problem User:** Login with problematic user account
- **Performance Glitch User:** Login with performance issues
- **Error User:** Login with error user account
- **Logout:** Verify logout functionality

**Total Tests:** 5

### 2. Product Listing Tests (`tests/listing.spec.ts`)

Tests product inventory and listing page functionality:

- **Add to Cart:** Adding products to the shopping cart
- **Remove from Cart:** Removing products from the shopping cart
- **Product Display:** Verify product information is correctly displayed

**Total Tests:** 3

### 3. Shopping Cart Tests (`tests/cart.spec.ts`)

Tests shopping cart operations:

- **Remove from Cart:** Remove items from the cart page
- **Checkout Navigation:** Proceed to checkout from cart

**Total Tests:** 2

### 4. Mini Cart Tests (`tests/minicart.spec.ts`)

Tests mini cart badge and quick interactions:

- **Mini Cart Badge Update:** Verify cart count badge updates correctly
- **Mini Cart Interactions:** Mini cart icon and badge interactions

**Total Tests:** 2

### 5. Order Workflow Tests (`tests/orders.spec.ts`)

Tests the complete end-to-end order placement workflow:

- **Complete Order Flow:**
  - Login with valid credentials
  - Add products to cart
  - Proceed to checkout
  - Fill checkout information
  - Complete order
  - Verify order confirmation

**Total Tests:** 1 comprehensive workflow test

**Overall Test Count:** 13+ individual tests

## Page Objects

### LoginPage (`pages/login-page.ts`)

Handles all login-related interactions:

- `login(username, password)` - Authenticate user
- `logout()` - Sign out user
- `fillUsername(username)` - Enter username
- `fillPassword(password)` - Enter password
- `clickLoginButton()` - Submit login form
- Error message validation

### ListingPage (`pages/listing-page.ts`)

Manages product listing page interactions:

- `addProductToCart(productName)` - Add product to cart
- `removeProductFromCart(productName)` - Remove product from cart
- `verifyProductExists(productName)` - Check product availability
- Product sorting and filtering options
- Cart badge updates

### CartPage (`pages/cart-page.ts`)

Handles shopping cart operations:

- `verifyCartItems()` - Validate cart contents
- `removeFromCart(productName)` - Remove item from cart
- `proceedToCheckout()` - Navigate to checkout
- Cart item count verification

### CheckoutPage (`pages/checkout-page.ts`)

Manages checkout process:

- `fillCheckoutInfo(firstName, lastName, postalCode)` - Enter checkout details
- `continueCheckout()` - Proceed to order review
- `completeOrder()` - Submit order
- Form validation and error handling

### ConfirmationPage (`pages/confirmation-page.ts`)

Validates order completion:

- `verifyOrderConfirmation()` - Confirm successful order
- `backToProducts()` - Return to product listing
- Success message validation

### MiniCartPage (`pages/mini-cart-page.ts`)

Handles mini cart badge and quick interactions:

- `verifyCartBadge()` - Check cart item count badge
- `clickCartIcon()` - Open full cart view
- Badge update verification

## Test Data

### Test Users

The project includes multiple test user accounts defined in `data/users.json`:

| Username | Type | Purpose |
|----------|------|---------|
| `standard_user` | Standard | Valid user for normal workflows |
| `locked_out_user` | Locked | Tests locked account behavior |
| `problem_user` | Problem | Tests with visual inconsistencies |
| `performance_glitch_user` | Performance | Tests with slow response times |
| `error_user` | Error | Tests error handling |
| `visual_user` | Visual | Tests visual regression scenarios |

**Default Password:** `secret_sauce`

### Payment Information

Test payment data (`data/users.json`):

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "postalCode": "12345"
}
```

### Credentials Management

The `utils/credentials.ts` utility provides:

- Environment variable support for `SAUCE_DEMO_PASSWORD`
- Default password fallback (`secret_sauce`)
- User credential retrieval for all test users

## Custom Fixtures

### Login Fixture (`fixtures/login-page.ts`)

A pre-configured test fixture that automatically logs in before each test:

**Usage:**

```typescript
import { test } from '../fixtures/login-page';

test('test with automatic login', async ({ loginPage }) => {
  // loginPage is already authenticated and on the inventory page
  await loginPage.verifyProductsPage();
});
```

**Features:**

- Automatic login before test execution
- Automatic logout after test execution
- Access to authenticated `loginPage` context
- Assertion verification for login/logout states

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
- **Environment Variables:** `SAUCE_DEMO_PASSWORD` from GitHub Secrets

### Setting Up CI/CD

1. Push code to a GitHub repository
2. Add the password secret:
   - Go to GitHub repository Settings → Secrets and variables → Actions
   - Add new secret: `SAUCE_DEMO_PASSWORD`
   - Set value to the SauceDemo password
3. Push to `main` branch - tests will automatically run

## Browser Configuration

### Currently Enabled

- **Chromium:** Desktop Chrome configuration

### Optional Browsers (Commented in Config)

To enable additional browsers, uncomment the respective configuration in `playwright.config.ts`:

#### Firefox

```typescript
{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
```

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

### Running Tests on Specific Browser

```bash
# Run only on Firefox (if enabled)
npx playwright test --project=firefox

# Run only on Chromium
npx playwright test --project=chromium
```

## Troubleshooting

### Tests Failing Due to Network Issues

- Ensure you have stable internet connectivity to https://www.saucedemo.com
- Increase timeout values in `playwright.config.ts` if needed

### Browser Installation Issues

```bash
# Reinstall Playwright browsers
npx playwright install --with-deps

# For specific browser
npx playwright install chromium
```

### Trace Viewer for Debugging

Failed tests automatically collect traces. View them with:

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
| `@playwright/test` | 1.58.2 | Test framework and assertions |
| `@types/node` | 25.2.3 | TypeScript Node.js type definitions |
| `typescript` | 5.9.3 | TypeScript compiler |

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
2. Follow the existing naming conventions
3. Add tests to appropriate test suite file
4. Update this README with new test suite descriptions
5. Ensure all tests pass locally before pushing

## License

This project is provided as-is for testing and educational purposes.

## Contact & Support

For issues or questions:
- Check existing test cases for examples
- Review Playwright documentation: https://playwright.dev
- Check the GitHub repository for known issues