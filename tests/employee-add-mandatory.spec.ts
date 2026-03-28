import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';

test.describe('PIM Add Employee - Mandatory Fields', () => {
  const firstName = 'Test';
  const lastName = 'User';
  const fullName = `${firstName} ${lastName}`;
  const empId = 'EMP' + Math.floor(1000 + Math.random() * 9000);

  test('should create employee with only mandatory fields', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(loginPage.dashboardHeader).toBeVisible({ timeout: 10000 });

    // Navigate to Add Employee page
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();

    // Fill mandatory fields
    await addEmployeePage.fillMandatoryFields(firstName, lastName);
    await addEmployeePage.fillEmployeeId(empId);

    // Submit
    await addEmployeePage.submit();

    // Wait for navigation to employee details page
    await addEmployeePage.waitForDetailsPage();

    // Verify employee header displays the full name
    await expect(addEmployeePage.employeeHeader(fullName)).toBeVisible({ timeout: 15000 });
  });
});