const { Given, When, Then } = require('@cucumber/cucumber');
const { DepositRelayPage } = require('../pages/DepositRelayPage');
const { expect } = require('@playwright/test');
const testData = require('../utils/testDataFactory');
const config = require('../utils/configLoader');

// ── Given ──────────────────────────────────────────────────────

Given('the user opens the Deposit Relay page', async function () {
  this.depositPage = new DepositRelayPage(this.page);
  await this.depositPage.openDepositRelay();
});

// ── When ───────────────────────────────────────────────────────

When('the user enters the valid OTP', async function () {
  await this.depositPage.enterOTP(testData.validOTP);
});

When('the user enters the invalid OTP', async function () {
  await this.depositPage.enterOTP(testData.invalidOTP);
});

When('the user enters a partial OTP', async function () {
  await this.depositPage.enterOTP(testData.partialOTP);
});

When('the user enters special characters as OTP', async function () {
  await this.depositPage.enterOTP(testData.specialCharsOTP);
});

When('the user submits without entering a password', async function () {
  await this.depositPage.submitWithoutOTP();
});

// ── Then ───────────────────────────────────────────────────────

Then('the welcome heading should contain {string}', async function (expectedText) {
  const heading = await this.depositPage.getWelcomeHeadingText();
  console.log(`  → Heading found: "${heading}"`);
  expect(heading).toContain(expectedText);
});

Then('the password input field should be present', async function () {
  const isVisible = await this.depositPage.isPasswordInputVisible();
  console.log(`  → Password input visible: ${isVisible}`);
  expect(isVisible).toBe(true);
});

Then('the powered by text should be visible', async function () {
  const isVisible = await this.depositPage.isPoweredByTextVisible();
  console.log(`  → Powered by text visible: ${isVisible}`);
  expect(isVisible).toBe(true);
});

Then('the page title should contain {string}', async function (expectedTitle) {
  const title = await this.depositPage.getPageTitle();
  console.log(`  → Page title: "${title}"`);
  expect(title).toContain(expectedTitle);
});

Then('the current URL should contain the relay UUID', async function () {
  const url = await this.depositPage.getCurrentUrl();
  console.log(`  → Current URL: "${url}"`);
  // UUID comes from testDataFactory — not hardcoded in feature file
  expect(url).toContain(testData.relayUUID);
});

Then('an error message should be displayed', async function () {
  const error = await this.depositPage.getErrorMessage();
  console.log(`  → Error message: "${error}"`);
  expect(error.length).toBeGreaterThan(0);
});

Then('the OTP screen should disappear', async function () {
  const isGone = await this.depositPage.isOTPScreenGone();
  console.log(`  → OTP screen gone: ${isGone}`);
  expect(isGone).toBe(true);
});

Then('the OTP screen should still be visible', async function () {
  const headings = await this.depositPage.getCurrentPageHeadings();
  console.log(`  → Current headings: ${headings}`);
  const otpScreenVisible = await this.depositPage.welcomeHeading.isVisible();
  expect(otpScreenVisible).toBe(true);
});

Then('the user should land on the next screen', async function () {
  const headings = await this.depositPage.getCurrentPageHeadings();
  console.log(`  → Next screen headings: ${headings}`);
  expect(headings.length).toBeGreaterThan(0);
});