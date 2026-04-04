import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM Login Test', () => {
  test('should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    
    // Default credentials: Username Admin and Password admin123
    await loginPage.login('Admin', 'admin123');

    // Verify successful login by checking if the Dashboard header is visible
    await expect(loginPage.dashboardHeader).toBeVisible();
  });
});