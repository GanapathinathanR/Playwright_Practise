import { Page, expect } from '@playwright/test';

/**
 * CartPage
 * Handles: cart verification, product count/price checks,
 * Proceed To Checkout, Register/Login redirect
 */
export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Verify cart page URL */
  async verifyCartPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/view_cart/, { timeout: 10_000 });
    console.log(' Cart page is displayed');
  }

  /** Verify exact number of products in cart */
  async verifyProductCount(expected: number): Promise<void> {
    const rows = this.page.locator('#cart_info_table tbody tr');
    await expect(rows).toHaveCount(expected, { timeout: 10_000 });
    console.log(` Cart has ${expected} product(s)`);
  }

  /** Verify quantity of first cart item */
  async verifyFirstItemQuantity(expectedQty: number): Promise<void> {
    const qty = await this.page
      .locator('.cart_quantity button')
      .first()
      .textContent();
    expect(qty?.trim()).toBe(String(expectedQty));
    console.log(` Cart item quantity is ${qty?.trim()}`);
  }

  /** Print all cart items (name, qty, price, total) to console */
  async printCartSummary(): Promise<void> {
    const rows = this.page.locator('#cart_info_table tbody tr');
    const count = await rows.count();
    let totalQty = 0;

    console.log('\n ═══════════════ CART SUMMARY ═══════════════');
    console.log(`   Total unique products: ${count}`);

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const name  = await row.locator('.cart_description h4 a').textContent();
      const qty   = await row.locator('.cart_quantity button').textContent();
      const price = await row.locator('.cart_price p').textContent();
      const total = await row.locator('.cart_total p').textContent();
      const qtyNum = parseInt(qty?.trim() ?? '0', 10);
      totalQty += qtyNum;

      console.log(`\n   Product ${i + 1}:`);
      console.log(`     Name     : ${name?.trim()}`);
      console.log(`     Quantity : ${qtyNum}`);
      console.log(`     Price    : ${price?.trim()}`);
      console.log(`     Total    : ${total?.trim()}`);
    }
    console.log(`\n   Grand total items: ${totalQty}`);
    console.log('═══════════════════════════════════════════════\n');
  }

  /** Log and verify prices, quantities, totals for two products */
  async verifyTwoProductDetails(): Promise<void> {
    const rows = this.page.locator('#cart_info_table tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row   = rows.nth(i);
      const price = await row.locator('.cart_price p').textContent();
      const qty   = await row.locator('.cart_quantity button').textContent();
      const total = await row.locator('.cart_total p').textContent();
      console.log(
        `  Product ${i + 1} → Price: ${price?.trim()}  Qty: ${qty?.trim()}  Total: ${total?.trim()}`
      );
    }
    console.log(' Prices, quantities and totals verified');
  }

  /** Click Proceed To Checkout */
  async clickProceedToCheckout(): Promise<void> {
    await this.page.locator('a:has-text("Proceed To Checkout")').click();
    console.log(' Clicked Proceed To Checkout');
  }

  /** Click Register / Login link shown on checkout modal (guest user) */
  async clickRegisterLogin(): Promise<void> {
    await this.page.locator('a:has-text("Register / Login")').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Register / Login from checkout');
  }
}
