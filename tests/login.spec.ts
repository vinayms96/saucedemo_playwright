import { test, expect } from '../fixtures/login-page';
import { ListingPage } from '../pages/listing.page';
import { LoginPage } from '../pages/login.page';
import { getUserCredentials } from '../utils/credentials';

/**
 * This test suite covers the login functionality of the saucedemo application. It includes tests for successful login with valid credentials and logout functionality. The tests utilize a fixture to handle the login process and ensure that the user is logged in before executing tests that require authentication.
 * The first test verifies that a user can log in successfully with valid credentials and is redirected to the inventory page. The second test uses the loginPage fixture to ensure that the user is logged in before executing assertions on the inventory page, and also verifies that the logout functionality works correctly after the tests are completed.
 */
test.describe('Login Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const listingPage = new ListingPage(page);
        const creds = getUserCredentials('standard_user');

        await page.goto('/');
        await loginPage.getPageTitle();
        await loginPage.login(creds.username, creds.password);

        // Landing page
        expect(await listingPage.getPageTitle()).toHaveText('Products');

        // Verify that the user is redirected to the inventory page
        await expect(page).toHaveURL(/.*saucedemo.com\/inventory.html/);
    });

    test('should login successfully and logout successfully via fixture', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        await expect(await listingPage.addToCart('Sauce Labs Backpack')).toBeVisible(); // Verify that we are logged in and on the inventory page
    });

    test('should not be able to login with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const creds = getUserCredentials('locked_out_user');

        await page.goto('/');
        await loginPage.getPageTitle();
        await loginPage.login(creds.username, creds.password);

        // Verify that the appropriate error message is displayed for locked out users
        const errorMessage = loginPage.locked_out_error;
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('should be able to login but has problematic behavior', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const listingPage = new ListingPage(page);
        const creds = getUserCredentials('problem_user');

        await page.goto('/');
        await loginPage.getPageTitle();
        await loginPage.login(creds.username, creds.password);

        // Verify that the user is redirected to the inventory page
        await expect(page).toHaveURL(/.*saucedemo.com\/inventory.html/);

        // Verify that the images are not displayed for the problematic user
        const productImages = listingPage.product_images;
        for (let i = 0; i < await productImages.count(); i++) {
            await expect(productImages.nth(i)).toHaveAttribute('src', /.*\/static\/media\/sl-404\.168b1cce10384b857a6f\.jpg/); // Verify that the product images have a same src
        }
    });

    test('should be able to login but has performance glitch', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const listingPage = new ListingPage(page);
        const creds = getUserCredentials('performance_glitch_user');

        await page.goto('/');
        await loginPage.getPageTitle();
        await loginPage.login(creds.username, creds.password);

        // Verify that the user is redirected to the inventory page
        await expect(page).toHaveURL(/.*saucedemo.com\/inventory.html/);

        // Verify that the inventory page load took more than 1 second (performance glitch)
        const start = Date.now();
        await listingPage.page.waitForLoadState('load');
        const elapsed = Date.now() - start;
        expect(elapsed).toBeGreaterThanOrEqual(1); // Verify that the page load time is greater than or equal to 1 second
    });

});
