import { Page, expect } from '@playwright/test';

/**
 * ProductsPage
 * Handles: ALL PRODUCTS listing, hover-add-to-cart,
 * product detail view, quantity, and review form
 */
export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Verify ALL PRODUCTS page heading */
  async verifyAllProductsVisible(): Promise<void> {
    await expect(
      this.page.locator('h2.title.text-center')
    ).toContainText('All Products', { timeout: 10_000 });
    console.log(' ALL PRODUCTS page is visible');
  }

  /** Hover over nth product (0-based) and click Add to cart */
  async hoverAndAddToCart(index: number): Promise<void> {
    const card = this.page.locator('.productinfo').nth(index);
    await card.hover();
    await card.locator('a.add-to-cart').click();
    console.log(` Hovered and added product ${index + 1} to cart`);
  }

  /** Click Continue Shopping in modal */
  async clickContinueShopping(): Promise<void> {
    await this.page.locator('button:has-text("Continue Shopping")').click();
    await this.page.waitForTimeout(400);
    console.log(' Clicked Continue Shopping');
  }

  /** Click View Cart in modal */
  async clickViewCartInModal(): Promise<void> {
    await this.page.locator('a:has-text("View Cart")').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked View Cart');
  }

  /** Click View Product link for a given index (0-based) */
  async clickViewProduct(index: number = 0): Promise<void> {
    await this.page.locator('a[href^="/product_details/"]').nth(index).click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(` Clicked View Product ${index + 1}`);
  }

  /** Verify product detail page is open */
  async verifyProductDetailVisible(): Promise<void> {
    await expect(
      this.page.locator('.product-information')
    ).toBeVisible({ timeout: 10_000 });
    const name = await this.page.locator('.product-information h2').textContent();
    console.log(` Product detail page opened: ${name?.trim()}`);
  }

  /** Set quantity on product detail page */
  async setQuantity(qty: number): Promise<void> {
    await this.page.locator('input#quantity').fill(String(qty));
    console.log(` Quantity set to ${qty}`);
  }

  /** Click Add to cart on the product detail page */
  async clickAddToCartDetail(): Promise<void> {
    await this.page.locator('button:has-text("Add to cart")').click();
    console.log(' Clicked Add to cart on detail page');
  }

  // ─── Review Form ───────────────────────────────────────────────

  /** Verify Write Your Review section is visible */
  async verifyWriteYourReviewVisible(): Promise<void> {
    await expect(
      this.page
        .locator('a[href="#reviews"]:has-text("Write Your Review")')
        .or(this.page.locator('h2:has-text("Write Your Review")'))
    ).toBeVisible({ timeout: 10_000 });
    console.log(' "Write Your Review" is visible');
  }

  /** Fill review name, email, and review text */
  async fillReviewForm(name: string, email: string, reviewText: string): Promise<void> {
    await this.page.locator('input#name').fill(name);
    await this.page.locator('input#email').fill(email);
    await this.page.locator('textarea#review').fill(reviewText);
    console.log(` Review filled for: ${name}`);
  }

  /** Click Submit review button */
  async clickSubmitReview(): Promise<void> {
    await this.page.locator('button#button-review').click();
    console.log(' Clicked Submit review');
  }

  /** Verify review success message */
  async verifyReviewSuccess(): Promise<void> {
    await expect(
      this.page.locator('div.alert-success:has-text("Thank you for your review.")')
    ).toBeVisible({ timeout: 10_000 });
    console.log(' "Thank you for your review." message is visible');
  }

  /** Add multiple products to cart from products listing page */
  async addMultipleProductsToCart(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const card = this.page.locator('.productinfo').nth(i);
      await card.hover();
      await card.locator('a.add-to-cart').click();
      if (i < count - 1) {
        await this.page.locator('button:has-text("Continue Shopping")').click();
        await this.page.waitForTimeout(400);
      } else {
        await this.page.locator('a:has-text("View Cart")').click();
      }
      console.log(`   Added product ${i + 1} of ${count}`);
    }
  }
}
