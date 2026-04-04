import { type Page } from '@playwright/test';

export class AddEmployeePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  }

  get firstNameInput() {
    return this.page.locator('input[name="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('input[name="lastName"]');
  }

  get saveButton() {
    // Use exact accessible name "Save" to avoid matching "Save and Add Another"
    return this.page.getByRole('button', { name: 'Save' });
  }

  async fillMandatoryFields(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async submit() {
    await this.saveButton.click();
  }

  get employeeIdInput() {
    // The Employee Id field is inside a container with class 'oxd-input-group' that contains the label text
    return this.page.locator('div.oxd-input-group:has-text("Employee Id") input');
  }

  get errorMessage() {
    // Check for toast messages, alerts, or inline validation messages near Employee Id field
    const toast = this.page.locator('.oxd-toast-content, .oxd-toast--error, [role="alert"]');
    const inline = this.employeeIdInput.locator('xpath=following-sibling::*[1]');
    return toast.or(inline);
  }

  async fillEmployeeId(id: string) {
    await this.employeeIdInput.fill(id);
  }

  async waitForDetailsPage() {
    // After save, the page navigates to the employee details page
    await this.page.waitForURL(/viewPersonalDetails/);
  }

  employeeHeader(name: string) {
    // The name appears as a heading on the details page
    return this.page.getByRole('heading', { name: name });
  }
}