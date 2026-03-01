import { Page, Locator } from '@playwright/test';

const REMOVE_PRODUCT_BUTTON = '[data-test="remove-<>"]';
const PRODUCT_CARDS = '.cart_item_label';
const PRODUCT_NAMES = '[data-test="inventory-item-name"]';
const PRODUCT_DESCRIPTIONS = '[data-test="inventory-item-desc"]';

/**
 * This file defines a Page Object Model (POM) for the cart page of the saucedemo application. The CartPage class encapsulates the elements and actions related to the cart page, such as locating the product cards, names, and descriptions. It provides a method to remove a product from the cart by clicking on the corresponding remove button. The POM helps to abstract away the details of interacting with the cart page elements, making tests more readable and maintainable.
 */
export class CartPage {
    readonly page: Page;
    readonly product_cards: Locator;
    readonly product_names: Locator;
    readonly product_descriptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.product_names = page.locator(PRODUCT_NAMES);
        this.product_cards = page.locator(PRODUCT_CARDS);
        this.product_descriptions = page.locator(PRODUCT_DESCRIPTIONS);
    }

    async removeProduct(productName: string): Promise<Locator> {
        const convertedProductName = productName.toLowerCase().replace(/\s/g, '-');
        return this.page.locator(REMOVE_PRODUCT_BUTTON.replace('<>', convertedProductName));
    }
}
