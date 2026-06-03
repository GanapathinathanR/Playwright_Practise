import { Page, expect } from '@playwright/test';

/**
 * LoginPage
 * Handles: New User Signup form and Login to your account form
 */
export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Signup Section ────────────────────────────────────────────

  /** Verify 'New User Signup!' heading is visible */
  async verifyNewUserSignupVisible(): Promise<void> {
    await expect(this.page.locator('h2:has-text("New User Signup!")')).toBeVisible();
    console.log(' "New User Signup!" is visible');
  }

  /** Fill name and email in the signup section */
  async fillSignupNameAndEmail(name: string, email: string): Promise<void> {
    await this.page.locator('input[data-qa="signup-name"]').fill(name);
    await this.page.locator('input[data-qa="signup-email"]').fill(email);
    console.log(` Entered signup name: ${name}, email: ${email}`);
  }

  /** Click the Signup button */
  async clickSignupButton(): Promise<void> {
    await this.page.locator('button[data-qa="signup-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Signup button');
  }

  // ─── Login Section ─────────────────────────────────────────────

  /** Verify 'Login to your account' heading is visible */
  async verifyLoginHeadingVisible(): Promise<void> {
    await expect(this.page.locator('h2:has-text("Login to your account")')).toBeVisible();
    console.log(' "Login to your account" is visible');
  }

  /** Fill email and password in the login section */
  async fillLoginCredentials(email: string, password: string): Promise<void> {
    await this.page.locator('input[data-qa="login-email"]').fill(email);
    await this.page.locator('input[data-qa="login-password"]').fill(password);
    console.log(` Entered login email: ${email}`);
  }

  /** Click the Login button */
  async clickLoginButton(): Promise<void> {
    await this.page.locator('button[data-qa="login-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Login button');
  }

  /** Verify invalid credentials error message */
  async verifyInvalidCredentialsError(): Promise<void> {
    await expect(
      this.page.locator('p:has-text("Your email or password is incorrect!")')
    ).toBeVisible({ timeout: 10_000 });
    console.log(' Error "Your email or password is incorrect!" is visible');
  }
}
