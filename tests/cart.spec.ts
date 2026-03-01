import { test, expect } from '../fixtures/login-page';
import { CartPage } from '../pages/cart.page';
import { ListingPage } from '../pages/listing.page';
import { MiniCartPage } from '../pages/minicart.page';

test.describe('Cart tests', () => {
    test('added products in cart should get removed upon clicking remove button in cart page', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        const minicartPage = new MiniCartPage(page);
        const cartPage = new CartPage(page);

        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Bolt T-Shirt';

        // Add products to cart
        await (await listingPage.addToCart(product1)).click();
        await (await listingPage.addToCart(product2)).click();

        // Click on minicart icon to navigate to cart page
        await (await minicartPage.minicartIcon()).click();

        expect(await cartPage.product_names.allTextContents()).toEqual([product1, product2]); // Verify that the products added to cart are visible in the cart page

        // Remove products from cart
        await (await cartPage.removeProduct(product1)).click();
        await (await cartPage.removeProduct(product2)).click();

        expect(await cartPage.product_names.allTextContents()).toEqual([]); // Verify that the products removed from cart are not visible in the cart page
    });

    test('should show all the products added to cart', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        const minicartPage = new MiniCartPage(page);
        const cartPage = new CartPage(page);

        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Bolt T-Shirt';

        // Get product cards by filtering with product name
        const product1Card = (await listingPage.getProductCards()).filter({ hasText: product1 });
        const product2Card = (await listingPage.getProductCards()).filter({ hasText: product2 });

        // Get product descriptions for the products to be added to cart
        const product1Description = await product1Card.locator(listingPage.product_descriptions).allTextContents();
        const product2Description = await product2Card.locator(listingPage.product_descriptions).allTextContents();
        console.log('product1Description: ', product1Description);
        console.log('product2Description: ', product2Description);

        // Get product prices for the products to be added to cart
        const product1Price = await product1Card.locator(listingPage.product_prices).allTextContents();
        const product2Price = await product2Card.locator(listingPage.product_prices).allTextContents();
        console.log('product1Price: ', product1Price);
        console.log('product2Price: ', product2Price);

        // Add products to cart
        await (await listingPage.addToCart(product1)).click();
        await (await listingPage.addToCart(product2)).click();

        // Click on minicart icon to navigate to cart page
        await (await minicartPage.minicartIcon()).click();

        expect(await cartPage.product_names.allTextContents()).toEqual([product1, product2]); // Verify that the products added to cart are visible in the cart page

        const product1InCart = cartPage.product_cards.filter({ hasText: product1 });
        const product2InCart = cartPage.product_cards.filter({ hasText: product2 });

        // Verify that the descriptions of the products in cart are same as the descriptions of the products in listing page
        expect(await product1InCart.locator(cartPage.product_descriptions).allTextContents()).toEqual(product1Description); // Verify that the description of the product 1 in cart is same as the description of product 1 in listing page
        expect(await product2InCart.locator(cartPage.product_descriptions).allTextContents()).toEqual(product2Description); // Verify that the description of the product 2 in cart is same as the description of product 2 in listing page

        // Verify that the prices of the products in cart are same as the prices of the products in listing page
        expect(await product1InCart.locator(cartPage.product_prices).allTextContents()).toEqual(product1Price); // Verify that the price of the product 1 in cart is same as the price of product 1 in listing page
        expect(await product2InCart.locator(cartPage.product_prices).allTextContents()).toEqual(product2Price); // Verify that the price of the product 2 in cart is same as the price of product 2 in listing page

        // Alternative way to verify that the descriptions and prices of the products in cart are same as the descriptions and prices of the products in listing page
        expect(await cartPage.product_descriptions.allTextContents()).toEqual([product1Description[0], product2Description[0]]); // Verify that the descriptions of the products in cart are same as the descriptions of the products in listing page
        expect(await cartPage.product_prices.allTextContents()).toEqual([product1Price[0], product2Price[0]]); // Verify that the prices of the products in cart are same as the prices of the products in listing page

        // Remove products from cart
        await (await cartPage.removeProduct(product1)).click();
        await (await cartPage.removeProduct(product2)).click();

        // Verify that the products removed from cart are not visible in the cart page
        expect(await cartPage.product_names.allTextContents()).toEqual([]);
    });
});
