import { Page, Locator } from '@playwright/test';

const CHECKOUT_STEP_TITLE = '[data-test="title"]';
const FISRT_NAME_INPUT = '[data-test="firstName"]';
const LAST_NAME_INPUT = '[data-test="lastName"]';
const POSTAL_CODE_INPUT = '[data-test="postalCode"]';
const CONTINUE_BUTTON = '[data-test="continue"]';
const PRODUCT_NAMES = '[data-test="inventory-item-name"]';
const PRODUCT_DESCRIPTIONS = '[data-test="inventory-item-desc"]';
const PRODUCT_PRICES = '[data-test="inventory-item-price"]';
const PAYMENT_INFORMATION_LABEL = '[data-test="payment-info-label"]';
const PAYMENT_INFORMATION_VALUE = '[data-test="payment-info-value"]';
const SHIPPING_INFORMATION_LABEL = '[data-test="shipping-info-label"]';
const SHIPPING_INFORMATION_VALUE = '[data-test="shipping-info-value"]';
const ITEM_TOTAL_LABEL = '[data-test="subtotal-label"]';
const TAX_LABEL = '[data-test="tax-label"]';
const TOTAL_LABEL = '[data-test="total-label"]';
const FINISH_BUTTON = '[data-test="finish"]';

/**
 * This file defines a Page Object Model (POM) for the checkout page of the saucedemo application. The CheckoutPage class is currently empty, but it can be extended in the future to include elements and actions related to the checkout process, such as filling out the checkout form, verifying order details, and confirming the purchase. The POM helps to abstract away the details of interacting with the checkout page elements, making tests more readable and maintainable.
 */

export class CheckoutPage {
    readonly page: Page;
    readonly checkout_step_title: Locator;
    readonly first_name_input: Locator;
    readonly last_name_input: Locator;
    readonly postal_code_input: Locator;
    readonly continue_button: Locator;
    readonly product_names: Locator;
    readonly product_descriptions: Locator;
    readonly product_prices: Locator;
    readonly payment_information_label: Locator;
    readonly payment_information_value: Locator;
    readonly shipping_information_label: Locator;
    readonly shipping_information_value: Locator;
    readonly item_total_label: Locator;
    readonly tax_label: Locator;
    readonly total_label: Locator;
    readonly finish_button: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkout_step_title = page.locator(CHECKOUT_STEP_TITLE);
        this.first_name_input = page.locator(FISRT_NAME_INPUT);
        this.last_name_input = page.locator(LAST_NAME_INPUT);
        this.postal_code_input = page.locator(POSTAL_CODE_INPUT);
        this.continue_button = page.locator(CONTINUE_BUTTON);
        this.product_names = page.locator(PRODUCT_NAMES);
        this.product_descriptions = page.locator(PRODUCT_DESCRIPTIONS);
        this.product_prices = page.locator(PRODUCT_PRICES);
        this.payment_information_label = page.locator(PAYMENT_INFORMATION_LABEL);
        this.payment_information_value = page.locator(PAYMENT_INFORMATION_VALUE);
        this.shipping_information_label = page.locator(SHIPPING_INFORMATION_LABEL);
        this.shipping_information_value = page.locator(SHIPPING_INFORMATION_VALUE);
        this.item_total_label = page.locator(ITEM_TOTAL_LABEL);
        this.tax_label = page.locator(TAX_LABEL);
        this.total_label = page.locator(TOTAL_LABEL);
        this.finish_button = page.locator(FINISH_BUTTON);
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.first_name_input.fill(firstName);
        await this.last_name_input.fill(lastName);
        await this.postal_code_input.fill(postalCode);
    }
}
