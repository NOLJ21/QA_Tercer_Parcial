import { expect, Locator, Page } from '@playwright/test';

export class SubProjectAddPage {
  readonly page: Page;
  readonly url = 'https://todo.ly/';
  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitLoginButton: Locator;
  readonly subProjectTab: Locator;
  readonly optionsButton: Locator;
  readonly addSubProjectButton: Locator;
  readonly subProjectInput: Locator;
  readonly saveButton: Locator;
  private static subProjectCounter = 1;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('.HPHeaderLogin > a');
    this.emailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
    this.passwordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
    this.submitLoginButton = page.getByRole('button', { name: 'Submit' });
    this.subProjectTab = page.getByRole('cell', { name: 'Sub Project', exact: true });
    this.optionsButton = page.getByRole('img', { name: 'Options' });
    this.addSubProjectButton = page.getByRole('link', { name: 'Add item below' });
    this.subProjectInput = page.locator('#ProjectEditDiv input#ItemEditTextbox');
    this.saveButton = page.getByRole('img', { name: 'Save' });
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

  async addSubProject(): Promise<string> {
    const subProjectName = `Subproyecto ${SubProjectAddPage.subProjectCounter++}`;
    await this.subProjectTab.click();
    await this.optionsButton.waitFor({ state: 'visible' });
    await this.optionsButton.click();
    await expect(this.addSubProjectButton).toBeVisible();
    await this.addSubProjectButton.click();
    const input = this.subProjectInput.nth(0);
    await input.waitFor({ state: 'visible' });
    await input.click();
    await input.fill(subProjectName);
    await this.saveButton.click();
    return subProjectName;
  }
}
