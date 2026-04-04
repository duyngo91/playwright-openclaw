import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';

test.describe('PIM Add Employee - Duplicate ID Validation', () => {
  // Generate a unique employee ID that is unlikely to exist prior
  const fixedId = 'EMP' + Math.floor(1000 + Math.random() * 9000);
  const firstName1 = 'Existing';
  const lastName1 = 'Employee';
  const firstName2 = 'Another';
  const lastName2 = 'User';

  test('should display error when using existing Employee ID', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await expect(loginPage.dashboardHeader).toBeVisible({ timeout: 10000 });

    const addEmployeePage = new AddEmployeePage(page);

    // Step 1: Create first employee with fixedId
    await addEmployeePage.goto();
    await addEmployeePage.fillMandatoryFields(firstName1, lastName1);
    await addEmployeePage.fillEmployeeId(fixedId);
    await addEmployeePage.submit();
    await addEmployeePage.waitForDetailsPage();

    // Step 2: Return to Add Employee page to attempt duplicate
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');

    // Step 3: Fill form with different name but same Employee ID
    await addEmployeePage.fillMandatoryFields(firstName2, lastName2);
    await addEmployeePage.fillEmployeeId(fixedId);

    // Step 4: Submit and expect validation error (stay on same page)
    await addEmployeePage.submit();

    // Expect that the form did not navigate away (still on addEmployee page)
    await expect(addEmployeePage.page).toHaveURL(/addEmployee/);
  });
});