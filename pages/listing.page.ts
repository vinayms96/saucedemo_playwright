import { Page, Locator } from '@playwright/test';

const PAGE_TITLE = '.title';
const PRODUCT_IMAGES = 'img.inventory_item_img';
const PRODUCT_COUNT = '.inventory_item';
const PRODUCT_NAMES = '[data-test="inventory-item-name"]';
const PRODUCT_PRICES = '[data-test="inventory-item-price"]';
const SORT_DROPDOWN = '.product_sort_container';

/**
 * This file defines a Page Object Model (POM) for the listing page of the saucedemo application. The ListingPage class encapsulates the elements and actions related to the inventory page, such as locating the page title, product images, and counting the number of products displayed. It provides a method to retrieve the page title, which can be used in tests to verify that the user has successfully navigated to the inventory page after logging in. The POM helps to abstract away the details of interacting with the page elements, making tests more readable and maintainable.
 */

export class ListingPage {
    readonly page: Page;
    readonly page_title: Locator;
    readonly product_images: Locator;
    readonly product_count: Locator;
    readonly product_names: Locator;
    readonly product_prices: Locator;
    readonly sort_dropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.page_title = page.locator(PAGE_TITLE);
        this.product_images = page.locator(PRODUCT_IMAGES);
        this.product_count = page.locator(PRODUCT_COUNT);
        this.product_names = page.locator(PRODUCT_NAMES);
        this.product_prices = page.locator(PRODUCT_PRICES);
        this.sort_dropdown = page.locator(SORT_DROPDOWN);
    }

    async getPageTitle(): Promise<Locator> {
        return (await this.page_title);
    }

    async getProductCount(): Promise<number> {
        return await this.product_count.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.product_names.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.product_prices.allTextContents();
        return prices.map((price) => parseFloat(price.replace('$', '')));
    }
}
