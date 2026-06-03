const { BasePage } = require('./BasePage');
const config = require('../utils/configLoader');

class DepositRelayPage extends BasePage {
  constructor(page) {
    super(page);

    // ── Welcome / OTP Page ─────────────────────────────────────
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome/i });
    this.subText        = page.locator('h5.MuiTypography-h5');
    this.passwordInput  = page.locator('input#code[name="code"]');
    this.poweredByText  = page.locator('p.MuiTypography-body1');

    // ── Error / Success ────────────────────────────────────────
    this.errorMessage   = page.locator('[class*="error" i], [role="alert"]').first();
    this.successMessage = page.locator('[class*="success" i]').first();
  }

  // ── Navigation ─────────────────────────────────────────────────

  async openDepositRelay() {
    await this.navigateTo(config.depositRelayPath);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('heading', { name: /Welcome/i }).waitFor({
      state: 'visible',
      timeout: 30000
    });
  }

  // ── OTP Actions ────────────────────────────────────────────────

  async enterOTP(otp) {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.fill(otp);
    // Auto-submit triggers after last character — wait for page to react
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('networkidle');
  }

  async submitWithoutOTP() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.fill('');
    await this.passwordInput.press('Enter');
    await this.page.waitForTimeout(2000);
  }

  // ── Getters ────────────────────────────────────────────────────

  async getWelcomeHeadingText() {
    await this.welcomeHeading.waitFor({ state: 'visible', timeout: 15000 });
    return await this.welcomeHeading.innerText();
  }

  async getSubText() {
    await this.subText.waitFor({ state: 'visible', timeout: 15000 });
    return await this.subText.innerText();
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    return await this.errorMessage.innerText();
  }

  async getCurrentPageHeadings() {
    return await this.page.locator('h1, h2, h3, h4, h5').allInnerTexts();
  }

  // ── Visibility Checks ──────────────────────────────────────────

  async isPasswordInputVisible() {
    return await this.passwordInput.isVisible();
  }

  async isPoweredByTextVisible() {
    return await this.poweredByText.isVisible();
  }

  async isOTPScreenGone() {
    await this.page.waitForTimeout(2000);
    return await this.welcomeHeading.isHidden();
  }
}

module.exports = { DepositRelayPage };