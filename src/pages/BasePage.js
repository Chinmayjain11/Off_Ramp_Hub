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
}

module.exports = { BasePage };