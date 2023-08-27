import { test, expect, Page } from '@playwright/test';

const cleanTestProject = async (page: Page) => {
  await page.goto('/');
};

test.beforeEach(async ({ page }) => await cleanTestProject(page));
test.afterEach(async ({ page }) => await cleanTestProject(page));

test('Landing page', async ({ page }) => {
  await page.goto('');

  // Test that the header is visible
  expect(await page.getByText('Error creating project')).toBeTruthy();
});
