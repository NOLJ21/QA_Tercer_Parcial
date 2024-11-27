import { test } from '@playwright/test';
import { SubProjectItemsAddPage } from '../pages/SubProjectItemsAddPage';

test('Crear ítems en Subproyecto 1', async ({ page }) => {
  const subProjectPage = new SubProjectItemsAddPage(page);

  // Navegar e iniciar sesión
  await subProjectPage.goto();
  await subProjectPage.login('nikolai.lopez@ucb.edu.bo', 'Abc123..');

  // Seleccionar el subproyecto
  await subProjectPage.selectSubProject();

  // Crear dos ítems
  await subProjectPage.createItem('Item 1');
  await subProjectPage.createItem('Item 2');
});
