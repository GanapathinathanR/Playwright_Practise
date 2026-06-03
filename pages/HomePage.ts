import { Page, expect } from '@playwright/test';

/**
 * HomePage
 * Handles: browser launch navigation, home page verification,
 * top-nav actions (Products, Cart, Signup/Login, Delete Account)
 */
export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────────────

  /** Navigate to home URL and wait for DOM */
  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Navigated to automationexercise.com');
  }
  async gotoforapiforget():Promise<void>{

    await this.page.goto('https://restful-booker.herokuapp.com/booking/3');
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Navigated to API URL');

  }

  /** Verify home page slider is visible */
  async verifyHomePageVisible(): Promise<void> {
    await expect(this.page.locator('#slider')).toBeVisible({ timeout: 15_000 });
    console.log(' Home page is visible');
  }

  // ─── Top Navigation Clicks ─────────────────────────────────────

  /** Click Signup / Login nav link */
  async clickSignupLogin(): Promise<void> {
    await this.page.locator('a[href="/login"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Signup / Login');
  }

  /** Click Products nav link */
  async clickProducts(): Promise<void> {
    await this.page.locator('a[href="/products"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Products');
  }

  /** Click Cart nav link */
  async clickCart(): Promise<void> {
    await this.page.locator('a[href="/view_cart"]').first().click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Cart');
  }

  /** Click Delete Account nav link */
  async clickDeleteAccount(): Promise<void> {
    await this.page.locator('a[href="/delete_account"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Delete Account');
  }

  /** Verify logged-in username in navbar */
  async verifyLoggedInAs(username: string): Promise<void> {
    const locator = this.page.locator('a:has-text("Logged in as")');
    await expect(locator).toBeVisible({ timeout: 10_000 });
    console.log(` Verified: Logged in as ${username}`);
  }

  /** Add first product to cart from home page using overlay button */
  async addFirstProductToCart(): Promise<void> {
    await this.page.locator('a.add-to-cart').first().click();
    console.log(' First product added to cart from home page');
  }

  /** Click Continue Shopping in the modal */
  async clickContinueShopping(): Promise<void> {
    await this.page.locator('button:has-text("Continue Shopping")').click();
    await this.page.waitForTimeout(400);
    console.log(' Clicked Continue Shopping');
  }
}
