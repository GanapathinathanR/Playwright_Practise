import { Page, expect } from '@playwright/test';

interface UserDetails {
  title: string;
  name: string;
  password: string;
  dateOfBirth: { day: string; month: string; year: string };
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

/**
 * RegisterPage
 * Handles: ENTER ACCOUNT INFORMATION form, checkboxes, address fields,
 * ACCOUNT CREATED confirmation, and ACCOUNT DELETED confirmation
 */
export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Verify 'ENTER ACCOUNT INFORMATION' heading is visible */
  async verifyEnterAccountInfoVisible(): Promise<void> {
    await expect(
      this.page.locator('h2.title.text-center b').first()
    ).toContainText('Enter Account Information', { timeout: 10_000 });
    console.log(' "ENTER ACCOUNT INFORMATION" is visible');
  }

  /** Fill title radio button */
  async selectTitle(title: string): Promise<void> {
    if (title === 'Mr') {
      await this.page.locator('#id_gender1').check();
    } else {
      await this.page.locator('#id_gender2').check();
    }
  }

  /** Fill password field */
  async fillPassword(password: string): Promise<void> {
    await this.page.locator('#password').fill(password);
  }

  /** Fill date of birth dropdowns */
  async fillDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.page.locator('#days').selectOption(day);
    await this.page.locator('#months').selectOption(month);
    await this.page.locator('#years').selectOption(year);
  }

  /** Check newsletter and offers checkboxes */
  async checkNewsletterAndOffers(): Promise<void> {
    await this.page.locator('#newsletter').check();
    await this.page.locator('#optin').check();
    console.log(' Newsletter and special offers checkboxes selected');
  }

  /** Fill address and contact details */
  async fillAddressDetails(details: UserDetails): Promise<void> {
    await this.page.locator('#first_name').fill(details.firstName);
    await this.page.locator('#last_name').fill(details.lastName);
    await this.page.locator('#company').fill(details.company);
    await this.page.locator('#address1').fill(details.address1);
    await this.page.locator('#address2').fill(details.address2);
    await this.page.locator('#country').selectOption(details.country);
    await this.page.locator('#state').fill(details.state);
    await this.page.locator('#city').fill(details.city);
    await this.page.locator('#zipcode').fill(details.zipcode);
    await this.page.locator('#mobile_number').fill(details.mobileNumber);
    console.log(' Address details filled');
  }

  /**
   * Full convenience method: fill all account info fields at once
   */
  async fillAllAccountDetails(details: UserDetails): Promise<void> {
    await this.selectTitle(details.title);
    await this.fillPassword(details.password);
    await this.fillDateOfBirth(
      details.dateOfBirth.day,
      details.dateOfBirth.month,
      details.dateOfBirth.year
    );
    await this.checkNewsletterAndOffers();
    await this.fillAddressDetails(details);
  }

  /** Click Create Account button */
  async clickCreateAccount(): Promise<void> {
    await this.page.locator('button[data-qa="create-account"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Create Account');
  }

  /** Verify ACCOUNT CREATED! heading */
  async verifyAccountCreated(): Promise<void> {
    await expect(
      this.page.locator('h2.title.text-center b')
    ).toContainText('Account Created!', { timeout: 10_000 });
    console.log(' "Account Created!" is visible');
  }

  /** Click Continue button after account creation */
  async clickContinue(): Promise<void> {
    await this.page.locator('a[data-qa="continue-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Continue');
  }

  /** Verify ACCOUNT DELETED! heading */
  async verifyAccountDeleted(): Promise<void> {
    await expect(
      this.page.locator('h2.title.text-center b')
    ).toContainText('Account Deleted!', { timeout: 10_000 });
    console.log(' "Account Deleted!" is visible');
  }

  /** Click Continue after account deletion */
  async clickContinueAfterDelete(): Promise<void> {
    await this.page.locator('a[data-qa="continue-button"]').click();
    await this.page.waitForLoadState('domcontentloaded');
    console.log(' Clicked Continue after deletion');
  }
}
