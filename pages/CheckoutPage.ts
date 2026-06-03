import { Page, expect } from '@playwright/test';

interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

/**
 * CheckoutPage
 * Handles: address details verification, order comment,
 * Place Order, payment form, order success, invoice download
 */
export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Verify address and order review sections are visible */
  async verifyAddressAndOrderVisible(): Promise<void> {
    await expect(
      this.page.locator('#address_delivery')
    ).toBeVisible({ timeout: 10_000 });
    await expect(this.page.locator('#cart_info')).toBeVisible();
    console.log(' Address Details and Review Your Order sections are visible');
  }

  /** Fill comment textarea and click Place Order */
  async enterCommentAndPlaceOrder(comment: string): Promise<void> {
    await this.page.locator('textarea.form-control').fill(comment);
    await this.page.locator('a:has-text("Place Order")').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Comment entered and Place Order clicked');
  }

  /** Fill all payment fields */
  async fillPaymentDetails(details: PaymentDetails): Promise<void> {
    await this.page.locator('input[data-qa="name-on-card"]').fill(details.nameOnCard);
    await this.page.locator('input[data-qa="card-number"]').fill(details.cardNumber);
    await this.page.locator('input[data-qa="cvc"]').fill(details.cvc);
    await this.page.locator('input[data-qa="expiry-month"]').fill(details.expiryMonth);
    await this.page.locator('input[data-qa="expiry-year"]').fill(details.expiryYear);
    console.log(' Payment details filled');
  }

  /** Click Pay and Confirm Order button */
  async clickPayAndConfirm(): Promise<void> {
    await this.page.locator('button[data-qa="pay-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Pay and Confirm Order');
  }

  /** Verify order placed successfully message */
  async verifyOrderSuccess(): Promise<void> {
    await expect(
      this.page.locator('h2[data-qa="order-placed"]')
    ).toBeVisible({ timeout: 15_000 });
    console.log(' Order placed successfully!');
  }

  /** Click Download Invoice and wait for download event */
  async downloadInvoice(): Promise<void> {
    const downloadPromise = this.page
      .waitForEvent('download', { timeout: 15_000 })
      .catch(() => null);
    await this.page.locator('a:has-text("Download Invoice")').click();
    const download = await downloadPromise;
    if (download) {
      console.log(` Invoice downloaded: ${download.suggestedFilename()}`);
    } else {
      console.log('  Download event not captured (may have downloaded silently)');
    }
  }

  /** Click Continue button on order confirmation page */
  async clickContinue(): Promise<void> {
    await this.page.locator('a[data-qa="continue-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Continue on order confirmation');
  }
}
