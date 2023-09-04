import { test, expect } from '@playwright/test';

// Test Landing Page and Nav Bar
test('Landing page', async ({ page }) => {
  // Check that the page title is correct
  await expect(page).toHaveTitle('Portfolio');
  // Check that the page header is correct
  await expect(page.locator('h1')).toHaveText('Welcome to my Portfolio');
  // Check that the page has a nav bar
  await expect(page.getByTestId('navbar')).toBeVisible();
  // Check that the nav bar has the correct links
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
});

// Test Dashboard Page
test('Dashboard page', async ({ page }) => {
  await page.goto('/dashboard');

  // Check that component with test id aboutme-card is visible
  await expect(page.getByTestId('aboutme-card')).toBeVisible();
});

// Test Login Page
test('Admin page', async ({ page }) => {
  await page.goto('/login');

  // Check that the page header is correct
  await expect(page.locator('h1')).toHaveText('Login Panel');
});
