const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('@playwright/test');
const config = require('../utils/configLoader');

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async init() {
    const browserMap = { chromium, firefox, webkit };
    const browserEngine = browserMap[config.browser] || chromium;

    this.browser = await browserEngine.launch({
      headless: config.headless,
      slowMo: 100
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      recordVideo: { dir: 'reports/videos/' }
    });

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(config.timeout);
    this.page.setDefaultNavigationTimeout(config.timeout);
  }

  async teardown() {
    if (this.context) await this.context.close();
    if (this.browser)  await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);