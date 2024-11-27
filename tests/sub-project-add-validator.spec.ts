import { test, expect } from '@playwright/test';
import { SubProjectAddPage } from '../pages/SubProjectAddPage';
import fs from 'fs';

test('Validar subproyectos', async ({ page }) => {
  const subProjectPage = new SubProjectAddPage(page);

  await subProjectPage.goto();
  await subProjectPage.login('nikolai.lopez@ucb.edu.bo', 'Abc123..');

  const state = JSON.parse(fs.readFileSync('state.json', 'utf-8'));
  const createdSubProjects: string[] = state.createdSubProjects;

  console.log(`Validando los subproyectos: ${createdSubProjects}`);

  for (const subProjectName of createdSubProjects) {
    const subProjectLocator = page.getByText(subProjectName);
    await expect(subProjectLocator).toBeVisible();
  }
});
