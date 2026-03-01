import { Page, Locator } from '@playwright/test';

const CONFIRMATION_HEADER = '[data-test="complete-header"]';
const CONFIRMATION_MESSAGE = '[data-test="complete-text"]';
const BACK_HOME_BUTTON = '[data-test="back-to-products"]';

export class ConfirmationPage {
    readonly page: Page;
    readonly confirmation_header: Locator;
    readonly confirmation_message: Locator;
    readonly back_home_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmation_header = page.locator(CONFIRMATION_HEADER);
        this.confirmation_message = page.locator(CONFIRMATION_MESSAGE);
        this.back_home_button = page.locator(BACK_HOME_BUTTON);
    }
}
