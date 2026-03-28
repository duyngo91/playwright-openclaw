import { type Page } from '@playwright/test';

export class EmployeeListPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('networkidle');
  }

  get nameInput() {
    // Find the input adjacent to the label "Employee Name"
    // The label is a sibling of the input within the same container
    return this.page.locator('text=Employee Name').locator('xpath=following::input[1]');
  }

  get idInput() {
    // Find the input adjacent to the label "Employee Id"
    return this.page.locator('text=Employee Id').locator('xpath=following::input[1]');
  }

  get searchButton() {
    // Search button with accessible name "Search"
    return this.page.getByRole('button', { name: /Search/i });
  }

  get resetButton() {
    // Reset button with accessible name "Reset"
    return this.page.getByRole('button', { name: /Reset/i });
  }

  async reset() {
    await this.resetButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchByName(name: string) {
    await this.nameInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchById(id: string) {
    await this.idInput.fill(id);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async hasResultRow(text: string): Promise<boolean> {
    // Normalize search text: collapse whitespace and lowercase
    const normalizedSearch = text.toLowerCase().replace(/\s+/g, '');

    // Wait for the table to be populated or for "No Records Found" message
    try {
      await Promise.race([
        this.page.waitForSelector('table tr', { state: 'visible', timeout: 5000 }),
        this.page.waitForSelector('text=No Records Found', { state: 'visible', timeout: 5000 })
      ]).catch(() => {});
    } catch (e) {
      // ignore
    }

    // Check rows on current page
    const rows = this.page.locator('table tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const rowText = (await row.textContent()) || '';
      const normalizedRow = rowText.toLowerCase().replace(/\s+/g, '');
      if (normalizedRow.includes(normalizedSearch)) {
        return true;
      }
    }

    // Handle pagination: navigate subsequent pages and re-check
    const paginationNav = this.page.locator('nav[aria-label="Pagination Navigation"]');
    const isPaginationVisible = await paginationNav.isVisible({ timeout: 1000 }).catch(() => false);
    if (!isPaginationVisible) {
      return false;
    }

    const nextButton = paginationNav.locator('li:last-child button');

    // Check up to 20 pages
    for (let i = 0; i < 20; i++) {
      const isVisible = await nextButton.isVisible({ timeout: 500 }).catch(() => false);
      const isDisabled = await nextButton.isDisabled().catch(() => true);
      if (isVisible && !isDisabled) {
        await nextButton.click();
        await this.page.waitForLoadState('networkidle');
        // Wait for rows after navigation as well
        try {
          await Promise.race([
            this.page.waitForSelector('table tr', { state: 'visible', timeout: 5000 }),
            this.page.waitForSelector('text=No Records Found', { state: 'visible', timeout: 5000 })
          ]).catch(() => {});
        } catch (e) {}
        const newCount = await rows.count();
        for (let j = 0; j < newCount; j++) {
          const row = rows.nth(j);
          const rowText = (await row.textContent()) || '';
          const normalizedRow = rowText.toLowerCase().replace(/\s+/g, '');
          if (normalizedRow.includes(normalizedSearch)) {
            return true;
          }
        }
      } else {
        break;
      }
    }
    return false;
  }
}