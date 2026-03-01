import { Locator, Page } from '@playwright/test';

const MINICART_BADGE = '[data-test="shopping-cart-badge"]';
const MINICART_ICON = '#shopping_cart_container';

/**
 * This file defines a Page Object Model (POM) for the mini cart component of the saucedemo application. The MiniCartPage class encapsulates the elements and actions related to the mini cart, such as locating the mini cart badge and icon. It provides methods to retrieve the mini cart badge and icon, which can be used in tests to verify that the mini cart badge shows the correct number of items in the cart and that clicking on the mini cart icon navigates to the cart page. The POM helps to abstract away the details of interacting with the mini cart elements, making tests more readable and maintainable.
 */
export class MiniCartPage {
    readonly page: Page;
    readonly minicart_badge: Locator;
    readonly minicart_icon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.minicart_badge = page.locator(MINICART_BADGE);
        this.minicart_icon = page.locator(MINICART_ICON);
    }

    async minicartBadge(): Promise<Locator> {
        return this.minicart_badge;
    }

    async minicartIcon(): Promise<Locator> {
        return this.minicart_icon;
    }
}
