class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
  }

  async navigateTo(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`);
    await this.waitForAppReady();
  }

  async waitForAppReady() {
    try {
      await this.page.waitForFunction(() => {
        const imgs = document.querySelectorAll('img[src*="loading"], img[alt="loading"]');
        return imgs.length === 0 ||
          Array.from(imgs).every(img => !img.offsetParent);
      }, { timeout: 15000 });
    } catch {
      await this.page.waitForLoadState('networkidle');
    }
  }

  async waitForVisible(locator, timeout = 15000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(locator, timeout = 10000) {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async scrollAndClick(locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

    // ── Generic MUI Dropdown handler ───────────────────────────
  // Handles ALL MUI Select dropdowns across the entire framework
  // Usage: await this.selectMUIDropdown(this.anyDropdownLocator, 'OptionText')
 async selectMUIDropdown(triggerLocator, optionText) {
  await triggerLocator.scrollIntoViewIfNeeded();
  
  // Click and wait for MUI animation to complete
  // MUI uses 225ms-300ms cubic-bezier transition
  await triggerLocator.click();
  await this.page.waitForTimeout(500);

  // Try waiting for listbox up to 3 times
  let listbox = null;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      listbox = this.page.getByRole('listbox');
      await listbox.waitFor({ state: 'visible', timeout: 5000 });
      console.log(`  → Listbox opened on attempt ${attempt}`);
      break;
    } catch {
      console.log(`  → Attempt ${attempt} failed, retrying click...`);
      await triggerLocator.click();
      await this.page.waitForTimeout(500);
    }
  }

  if (!listbox) {
    throw new Error(`Dropdown did not open after 3 attempts for option "${optionText}"`);
  }

  // Wait for options to fully render inside listbox
  await this.page.waitForTimeout(300);

  // Find and click option inside listbox
  const option = listbox.getByText(optionText, { exact: true });
  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click();

  // Confirm listbox closed
  await listbox.waitFor({ state: 'hidden', timeout: 5000 });
  console.log(`  → Selected: "${optionText}"`);
}
}

module.exports = { BasePage };