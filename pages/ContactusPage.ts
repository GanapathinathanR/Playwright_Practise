import { Page, expect } from '@playwright/test';

export class ContactUsPage {
   page: Page;
   

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Navigation ────────────────────────────────────────────────

  /** Click Contact Us nav link */
  async clickContactUs(): Promise<void> {
    await this.page.locator("//a[text()=' Contact us']").click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Contact Us');
  }

  // ─── Verification ──────────────────────────────────────────────

  /** Verify Contact Us page heading is visible */
  async verifyContactUsPageVisible(): Promise<void> {
    await expect(
      this.page.locator("//h2[normalize-space()='Get In Touch']")
    ).toBeVisible({ timeout: 10_000 });
    console.log(' Contact Us page is visible');
  }

  /** Verify success message after form submission */
  async verifySuccessMessage(): Promise<void> {
    await expect(
      this.page.locator('.contact-form .alert-success')
    ).toBeVisible({ timeout: 10_000 });
    console.log(' Success message displayed');
  }

  // ─── Form Actions ──────────────────────────────────────────────

  /** Fill Name field */
  async enterName(name: string): Promise<void> {
    await this.page.locator('input[data-qa="name"]').fill(name);
    console.log(` Entered name: ${name}`);
  }

  /** Fill Email field */
  async enterEmail(email: string): Promise<void> {
    await this.page.locator('input[data-qa="email"]').fill(email);
    console.log(` Entered email: ${email}`);
  }

  /** Fill Subject field */
  async enterSubject(subject: string): Promise<void> {
    await this.page.locator('input[data-qa="subject"]').fill(subject);
    console.log(` Entered subject: ${subject}`);
  }

  /** Fill Message field */
  async enterMessage(message: string): Promise<void> {
    await this.page.locator('textarea[data-qa="message"]').fill(message);
    console.log(` Entered message: ${message}`);
  }

  /** Click Submit button (auto-accepts the browser confirm dialog) */
  async clickSubmit(): Promise<void> {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.page.locator('input[data-qa="submit-button"]').click();
    console.log(' Clicked Submit');
  }
}