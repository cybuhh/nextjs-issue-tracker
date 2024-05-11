import { test, expect } from '@playwright/test';

test('valid titles', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Issue Tracker - Dashbaord/);

  await page.goto('/issues');
  await expect(page).toHaveTitle(/Issue Tracker - Issue list/);

  // disabled since it needs auth
  // await page.goto('/issues/new');
  // await expect(page).toHaveTitle(/Issue Tracker - New issue/);
});

test('header nav links', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.getByRole('heading', { name: 'Latest issues' })).toBeVisible();

  await page.getByRole('link', { name: 'Issues', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Issue', exact: true })).toBeVisible();
});
