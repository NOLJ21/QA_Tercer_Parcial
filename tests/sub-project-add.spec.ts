import { test } from '@playwright/test';
import { SubProjectAddPage } from '../pages/SubProjectAddPage';
import fs from 'fs';

test('Crear subproyectos', async ({ page }) => {
  const subProjectPage = new SubProjectAddPage(page);

  await subProjectPage.goto();
  await subProjectPage.login('nikolai.lopez@ucb.edu.bo', 'Abc123..');

  const createdSubProjects: string[] = [];
  for (let i = 0; i < 1; i++) {
    const subProjectName = await subProjectPage.addSubProject();
    console.log(`Subproyecto creado: ${subProjectName}`);
    createdSubProjects.push(subProjectName);
  }

  fs.writeFileSync('state.json', JSON.stringify({ createdSubProjects }, null, 2));
});
