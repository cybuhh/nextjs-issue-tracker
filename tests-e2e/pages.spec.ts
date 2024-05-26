import { test, expect } from '@playwright/test';

test('valid titles titles', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Issue Tracker - Dashbaord/);

  await page.goto('/issues');
  await expect(page).toHaveTitle(/Issue Tracker - Issue list/);
});

test('header nav links', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'new issue with user' }).click();
  await expect(page.getByRole('heading', { name: 'new issue with user' })).toBeVisible();

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await expect(page.getByRole('heading', { name: 'Latest issues' })).toBeVisible();

  await page.getByRole('link', { name: 'Issues', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Issue', exact: true })).toBeVisible();
});

test('block pages that required auth', async ({ page, request }) => {
  await page.goto('/issues/new');
  expect(page.url()).toContain('/auth/signin');

  await page.goto('/issues/1/edit');
  expect(page.url()).toContain('/auth/signin');
});

test('access pages after authorization after authentication', async ({ page, request }) => {
  await page.goto('/api/auth/signin');

  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Sign in with Credentials' }).click();

  await page.goto('/issues/new');
  await expect(page).toHaveTitle('Issue Tracker - New issue');

  await page.goto('/issues/1/edit');
  await expect(page).toHaveTitle('Application Crashes on Android Devices');
});
