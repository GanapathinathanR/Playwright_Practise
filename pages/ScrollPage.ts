import { Page, expect } from '@playwright/test';

/**
 * ScrollPage
 * Handles: scroll to bottom, subscription verification,
 * scroll up arrow, hero text verification
 */
export class ScrollPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Scroll Actions ────────────────────────────────────────────

  /** Scroll to bottom of page */
  async scrollToBottom(): Promise<void> {
    await this.page.keyboard.press('End');
    await this.page.waitForTimeout(1000);
    console.log(' Scrolled to bottom of page');
  }

  /** Click scroll-up arrow button (bottom right) */
  async clickScrollUpArrow(): Promise<void> {
    const arrow = this.page.locator('#scrollUp');
    await arrow.waitFor({ state: 'visible', timeout: 10_000 });
    await arrow.click();
    await this.page.waitForTimeout(1500);
    console.log(' Clicked scroll up arrow');
  }

  // ─── Verifications ─────────────────────────────────────────────

  /** Verify SUBSCRIPTION text is visible */
  async verifySubscriptionVisible(): Promise<void> {
    await expect(
      this.page.locator('h2:has-text("Subscription")')
    ).toBeVisible({ timeout: 10_000 });
    console.log(' SUBSCRIPTION is visible');
  }

  /** Verify page scrolled up and hero text is visible */
  async verifyPageScrolledUp(): Promise<void> {
    await expect(
      this.page.locator('h2:has-text("Full-Fledged practice website for Automation Engineers")')
    ).toBeVisible({ timeout: 10_000 });
    console.log(' Page scrolled up — hero text is visible');
  }
}