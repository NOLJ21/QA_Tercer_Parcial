import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todo.ly/');
  await page.locator('.HPHeaderLogin > a').click();
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail').fill('n');
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword').click();
  await page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword').fill('A');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('img', { name: 'Options' }).click();
  await page.getByRole('link', { name: 'Add item above' }).click();
  await page.getByRole('cell', { name: 'Filters Inbox 5 Today Next Projects Work 5 Save Cancel Editing Sub Project sdsds Subproyecto 1 2 Home Study Personal Shopping List Calidad 2 Add New Project   Recycle Bin 18', exact: true }).locator('#ItemEditTextbox').fill('P');
  await page.getByRole('img', { name: 'Save' }).click();
});