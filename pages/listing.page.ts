import { Page, Locator } from '@playwright/test';

const PAGE_TITLE = '.title';

export class ListingPage {
    readonly page: Page;
    readonly page_title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.page_title = page.locator(PAGE_TITLE);
    }

    async getPageTitle(): Promise<Locator> {
        return (await this.page_title);
    }
}
