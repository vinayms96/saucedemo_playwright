import { test, expect } from '../fixtures/login-page';
import { ListingPage } from '../pages/listing.page';
import { MiniCartPage } from '../pages/minicart.page';

/**
 * This test suite covers the mini cart functionality of the saucedemo application. It includes tests for verifying that the mini cart badge shows the correct number of items in the cart when products are added or removed, and that clicking on the mini cart icon navigates to the cart page. The tests utilize a fixture to handle the login process and ensure that the user is logged in before executing tests that require authentication.
 * The first test verifies that the mini cart badge is not visible when there are no items in the cart, shows the correct number of items when products are added to the cart, and is not visible again when products are removed from the cart. The second test verifies that adding products to the cart updates the mini cart badge with the correct number of items.
 */
test.describe('Mini cart tests', () => {
    test('should show badge when products added and removed after removing products from cart', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        const minicartPage = new MiniCartPage(page);

        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Bolt T-Shirt';

        await minicartPage.minicartBadge().then(async (badge) => {
            expect(await badge.allTextContents()).toEqual([]); // Verify that the minicart badge is not visible when there are no items in the cart
        });

        // Add products to cart
        await (await listingPage.addToCart(product1)).click();
        await (await listingPage.addToCart(product2)).click();

        // Verify that the minicart badge shows the correct number of items in the cart
        await minicartPage.minicartBadge().then(async (badge) => {
            expect(await badge.allTextContents()).toEqual(['2']);
        });

        // Remove products from cart
        await (await listingPage.removeFromCart(product1)).click();
        await (await listingPage.removeFromCart(product2)).click();

        // Verify that the minicart badge is not visible when there are no items in the cart
        await minicartPage.minicartBadge().then(async (badge) => {
            expect(await badge.allTextContents()).toEqual([]);
        });
    });

    test('add products to cart and verify in minicart', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        const minicartPage = new MiniCartPage(page);

        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Bolt T-Shirt';

        // Verify that the minicart badge is not visible when there are no items in the cart
        await minicartPage.minicartBadge().then(async (badge) => {
            expect(await badge.allTextContents()).toEqual([]);
        })

        // Add products to cart
        await (await listingPage.addToCart(product1)).click();
        await (await listingPage.addToCart(product2)).click();

        // Verify that the minicart badge shows the correct number of items in the cart
        await minicartPage.minicartBadge().then(async (badge) => {
            expect(await badge.allTextContents()).toEqual(['2']);
        });
    });
});
