import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe('PIM Employee List - Search', () => {
  const firstName = 'Search';
  const lastName = 'User';
  // Generate a unique employee ID to avoid conflicts
  const empId = 'EMP' + Math.floor(1000 + Math.random() * 9000);
  const fullName = `${firstName} ${lastName}`;

  test('should find employee by name and by ID', async ({ page }) => {
    // Increase timeout to account for pagination scanning
    test.setTimeout(120000);

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(loginPage.dashboardHeader).toBeVisible({ timeout: 10000 });

    // Create a known employee to search for
    const addEmployeePage = new AddEmployeePage(page);
    await addEmployeePage.goto();
    await addEmployeePage.fillMandatoryFields(firstName, lastName);
    await addEmployeePage.fillEmployeeId(empId);
    await addEmployeePage.submit();
    await addEmployeePage.waitForDetailsPage();

    // Go to Employee List and verify the employee appears in the table
    const employeeListPage = new EmployeeListPage(page);
    await employeeListPage.goto();
    // Reset filters to ensure no leftover state
    await employeeListPage.reset();

    const found = await employeeListPage.hasResultRow(fullName);
    expect(found).toBeTruthy();
  });
});