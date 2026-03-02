import { test, expect } from '@playwright/test';

test.describe('App e2e', () => {
  test.setTimeout(60000);

  test.beforeEach(async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.getByLabel('Username or email').fill('admin');
    await page.getByLabel('Password').fill('changeme');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/(manual|settings)/, { timeout: 10000 });
  });

  test('Manual page shows tool groups and first group is expandable', async ({ page }) => {
    await page.goto('/manual');
    await expect(page.getByRole('heading', { name: /beschikbare tools|exposed tools/i })).toBeVisible();
    const firstHeader = page.locator('.manual__group-header').first();
    await expect(firstHeader).toBeVisible();
    const firstGroup = page.locator('.manual__group').first();
    await expect(firstGroup).toBeVisible();
    await expect(firstGroup.locator('.manual__group-content')).toBeVisible();
  });

  test('Settings page shows Tools bijwerken button and refresh updates list', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByRole('heading', { name: /toolinstellingen|tool settings/i })).toBeVisible();
    const refreshBtn = page.getByRole('button', { name: /tools bijwerken|update tools/i });
    await expect(refreshBtn).toBeVisible();
    await refreshBtn.click();
    await expect(refreshBtn).toContainText(/bijwerken/i);
    await expect(page.getByText(/tool list updated|tools loaded/i)).toBeVisible({ timeout: 15000 });
  });

  test('Settings: enable all, save, then refresh keeps tools visible', async ({ page }) => {
    await page.goto('/settings');
    await page.getByRole('button', { name: /alles inschakelen|enable all/i }).click();
    await page.getByRole('button', { name: /wijzigingen opslaan|save changes/i }).click();
    await expect(page.getByText(/opgeslagen|saved/i)).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /tools bijwerken/i }).click();
    await expect(page.getByText(/tool list updated|tools loaded/i)).toBeVisible({ timeout: 15000 });
    const groups = page.locator('[class*="settings__group"]');
    await expect(groups.first()).toBeVisible();
  });
});
