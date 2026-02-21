import { Page, Locator } from '@playwright/test';

const PAGE_TITLE = '.title';
const PRODUCT_IMAGES = 'img.inventory_item_img';

export class ListingPage {
    readonly page: Page;
    readonly page_title: Locator;
    readonly product_images: Locator;

    constructor(page: Page) {
        this.page = page;
        this.page_title = page.locator(PAGE_TITLE);
        this.product_images = page.locator(PRODUCT_IMAGES);
    }

    async getPageTitle(): Promise<Locator> {
        return (await this.page_title);
    }
}
