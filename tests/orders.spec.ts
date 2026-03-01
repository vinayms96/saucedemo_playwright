import { paymentInfo } from '../data/user_data';
import { test, expect } from '../fixtures/login-page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ConfirmationPage } from '../pages/confirmation.page';
import { ListingPage } from '../pages/listing.page';
import { MiniCartPage } from '../pages/minicart.page';

test.describe('Placing orders tests', () => {
    test('should be able to place an order successfully', async ({ loginPage, page }) => {
        const listingPage = new ListingPage(page);
        const minicartPage = new MiniCartPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const confirmationPage = new ConfirmationPage(page);

        const product1 = 'Sauce Labs Bike Light';
        const product2 = 'Sauce Labs Bolt T-Shirt';

        // Get product cards by filtering with product name
        const product1Card = (await listingPage.getProductCards()).filter({ hasText: product1 });
        const product2Card = (await listingPage.getProductCards()).filter({ hasText: product2 });

        // Get product descriptions for the products to be added to cart
        const product1Description = await product1Card.locator(listingPage.product_descriptions).allTextContents();
        const product2Description = await product2Card.locator(listingPage.product_descriptions).allTextContents();

        // Get product prices for the products to be added to cart
        const product1Price = await product1Card.locator(listingPage.product_prices).allTextContents();
        const product2Price = await product2Card.locator(listingPage.product_prices).allTextContents();

        // Add products to cart
        await (await listingPage.addToCart(product1)).click();
        await (await listingPage.addToCart(product2)).click();

        // Click on minicart icon to navigate to cart page
        await (await minicartPage.minicartIcon()).click();

        expect(await cartPage.product_names.allTextContents()).toEqual([product1, product2]); // Verify that the products added to cart are visible in the cart page

        // Click on checkout button to navigate to checkout page
        await cartPage.checkout_button.click();
        await checkoutPage.checkout_step_title.waitFor({ state: 'visible' }); // Wait for the checkout step title to be visible to ensure that the checkout page has loaded
        expect(await checkoutPage.checkout_step_title.textContent()).toEqual('Checkout: Your Information'); // Verify that we are on the checkout page by checking the title of the page

        // Fill in checkout information and continue to overview page
        await checkoutPage.fillCheckoutInformation(paymentInfo.first_name, paymentInfo.last_name, paymentInfo.postal_code);
        await checkoutPage.continue_button.click();

        // Verify that we are on the overview page by checking the title of the page
        await checkoutPage.checkout_step_title.waitFor({ state: 'visible' }); // Wait for the checkout step title to be visible to ensure that the overview page has loaded
        expect(await checkoutPage.checkout_step_title.textContent()).toEqual('Checkout: Overview');

        // Verify that the products added to cart are visible in the overview page and their descriptions and prices are same as the descriptions and prices of the products in listing page
        expect(await checkoutPage.product_names.allTextContents()).toEqual([product1, product2]); // Verify that the products added to cart are visible in the overview page
        expect(await checkoutPage.product_descriptions.allTextContents()).toEqual([product1Description[0], product2Description[0]]); // Verify that the descriptions of the products in cart are same as the descriptions of the products in listing page
        expect(await checkoutPage.product_prices.allTextContents()).toEqual([product1Price[0], product2Price[0]]); // Verify that the prices of the products in cart are same as the prices of the products in listing page

        expect(checkoutPage.payment_information_label).toHaveText('Payment Information:'); // Verify that the payment information label is visible and has correct text
        expect(checkoutPage.payment_information_value).toHaveText(paymentInfo.credit_card); // Verify that the payment information value is visible and has correct text

        expect(checkoutPage.shipping_information_label).toHaveText('Shipping Information:'); // Verify that the shipping information label is visible and has correct text
        expect(checkoutPage.shipping_information_value).toHaveText(paymentInfo.shipping); // Verify that the shipping information value is visible and has correct text

        const itemPrice = parseFloat(product1Price[0].replace('$', '')) + parseFloat(product2Price[0].replace('$', ''));
        const taxAmount = parseFloat(paymentInfo.tax.replace('$', ''));

        // Verify that the item total, tax and total are displayed in the overview page
        expect(checkoutPage.item_total_label).toHaveText('Item total: $' + itemPrice.toFixed(2)); // Verify that the item total label is visible
        expect(checkoutPage.tax_label).toHaveText('Tax: ' + paymentInfo.tax); // Verify that the tax label is visible
        expect(checkoutPage.total_label).toHaveText('Total: $' + (itemPrice + taxAmount).toFixed(2)); // Verify that the total label is visible

        // Click on finish button to place the order and navigate to confirmation page
        await checkoutPage.finish_button.click();

        // Verify that we are on the confirmation page by checking the title of the page
        await confirmationPage.confirmation_header.waitFor({ state: 'visible' }); // Wait for the confirmation title to be visible to ensure that the confirmation page has loaded
        expect(await confirmationPage.confirmation_header.textContent()).toEqual('Thank you for your order!'); // Verify that we are on the confirmation page by checking the title of the page
        expect(await confirmationPage.confirmation_message.textContent()).toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!'); // Verify that we are on the confirmation page by checking the message of the page

        await confirmationPage.back_home_button.click(); // Click on back home button to navigate back to inventory page
        await listingPage.page_title.waitFor({ state: 'visible' }); // Wait for the inventory page title to be visible to ensure that the inventory page has loaded
        expect(await listingPage.page_title.textContent()).toEqual('Products'); // Verify that we are navigated back to the inventory page by checking the title of the page
    });
});
