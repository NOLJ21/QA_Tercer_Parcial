import { expect, Locator, Page } from '@playwright/test';

export class SubProjectItemsAddPage {
  readonly page: Page;
  readonly url = 'http://todo.ly/';
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitLoginButton: Locator;
  readonly subProjectTab: Locator;
  readonly newItemInput: Locator;
  readonly addItemButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('.HPHeaderLogin > a');
    this.emailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
    this.passwordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
    this.submitLoginButton = page.getByRole('button', { name: 'Submit' });
    this.subProjectTab = page.getByRole('cell', { name: 'Subproyecto 1', exact: true });
    this.newItemInput = page.locator('#NewItemContentInput');
    this.addItemButton = page.getByRole('button', { name: 'Add' });
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(email: string, password: string) {
    await this.loginButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitLoginButton.click();
  }

  async selectSubProject() {
    await this.subProjectTab.click();
  }

  async createItem(itemName: string) {
    await this.newItemInput.fill(itemName);
    await this.addItemButton.click();
  }

  async validateItemExists(itemName: string) {
    const itemLocator = this.page.getByText(itemName);
    await expect(itemLocator).toBeVisible();
  }
}
