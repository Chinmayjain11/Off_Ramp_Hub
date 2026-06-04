const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');
const testData = require('../utils/testDataFactory');

class BeneficiaryProductPage extends BasePage {
  constructor(page) {
    super(page);
    // Beneficiary Selectors
    this.addBeneficiaryBtn = page.locator('button[type="button"]:has-text("Add Beneficiary")');
    this.beneficiaryFirstNameInput = this.page.locator('input[name="firstName"]');
    this.beneficiaryLastNameInput = this.page.locator('input[name="lastName"]');
    this.beneficiarySubmitBtn = page.locator('[data-testid="beneficiary-submit"], button:has-text("Add")');
    this.beneficiarySexSelect = this.page.locator('div#sex[role="combobox"]');
    this.dobWidget = this.page.locator('div.MuiPickersSectionList-root[tabindex="0"]');
    this.dobField = this.page.locator('[class*="MuiPickersSectionList-root"]').first();
    this.dobHiddenInput = this.page.locator('input[name="dateOfBirthOrFormation"]');
    this.dobCalendarBtn = this.page.locator('button[aria-label="Choose date"]');
    this.dobHiddenInput = this.page.locator('input[name="dateOfBirthOrFormation"]');
    this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true });

    // Product Selectors
    this.addProductBtn = this.page.locator('button:has(.MuiButton-endIcon)').first();
    this.productTypeToggleBtn = this.page.getByRole('button', { name: 'Collapse' }).or(this.page.getByRole('button', { name: 'Expand' })).first();
    this.productTypeOption = this.page.getByText(testData.product.type, { exact: true });
    this.accountNicknameInput = this.page.locator('input[placeholder="Nickname"]');
    this.expectedDepositInput = this.page.locator('input[placeholder="0"].MuiInputBase-inputAdornedStart');
    this.productDropdown = this.page.locator('div#product-select[role="combobox"]');

    
  }

  // Beneficiary Methods
  async navigateToBeneficiary() {
    await this.addBeneficiaryBtn.click();
    
  }

async selectBeneficiarySex(sex) {
  await this.selectMUIDropdown(this.beneficiarySexSelect, sex);
  
  // Verify selection via native hidden input
  const selectedValue = await this.page
    .locator('input[name="sex"]')
    .inputValue();
  console.log(`  → Sex verified as: "${selectedValue}"`);
  expect(selectedValue).toBe(sex);
}

async enterDOB(dob) {
  const [month, day, year] = dob.split('/');
  const targetMonth = parseInt(month);
  const targetDay   = parseInt(day);
  const targetYear  = parseInt(year);
  console.log(`  → Entering DOB via calendar: ${month}/${day}/${year}`);

  // ── Step 1: Open calendar ──────────────────────────────────
  const calendarBtn = this.page.locator('button[aria-label="Choose date"]');
  await calendarBtn.scrollIntoViewIfNeeded();
  await calendarBtn.click();
  await this.page.waitForTimeout(500);
  console.log(`  → Calendar opened`);

  // ── Step 2: Click dropdown arrow → switch to year view ────
  const switchViewBtn = this.page
    .locator('[class*="MuiPickersCalendarHeader-switchViewIcon"]')
    .first();
  await switchViewBtn.waitFor({ state: 'visible', timeout: 5000 });
  await switchViewBtn.click();
  await this.page.waitForTimeout(500);
  console.log(`  → Switched to year view`);

  // ── Step 3: Scroll to and select target year ──────────────
  const yearButton = this.page
    .getByRole('radio', { name: String(targetYear), exact: true })
    .or(this.page.getByRole('button', { name: String(targetYear), exact: true }))
    .first();

  await yearButton.scrollIntoViewIfNeeded();
  await this.page.waitForTimeout(300);
  await yearButton.click();
  await this.page.waitForTimeout(500);
  console.log(`  → Year ${targetYear} selected`);

  // ── Step 4: Navigate to correct month using prev/next ─────
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const targetMonthName = monthNames[targetMonth - 1];

  for (let i = 0; i < 12; i++) {
    const headerText = await this.page
      .locator('.MuiPickersCalendarHeader-label')
      .first()
      .innerText();
    console.log(`  → Calendar showing: "${headerText}"`);

    if (headerText.includes(targetMonthName)) {
      console.log(`  → Correct month reached: ${targetMonthName}`);
      break;
    }

    const currentMonthIndex = monthNames.findIndex(m => headerText.includes(m));
    if (currentMonthIndex > targetMonth - 1) {
      await this.page.locator('[aria-label="Previous month"]').click();
    } else {
      await this.page.locator('[aria-label="Next month"]').click();
    }
    await this.page.waitForTimeout(300);
  }

  // ── Step 5: Select correct day ────────────────────────────
  // Wait for day grid to fully render
  await this.page.waitForTimeout(300);

  // Get all available day cells
  const allDayCells = this.page.getByRole('gridcell');
  const count = await allDayCells.count();
  console.log(`  → Total day cells found: ${count}`);

  // Find exact day — match full string to avoid e.g. "1" matching "10", "11"
  let dayClicked = false;
  for (let i = 0; i < count; i++) {
    const cell = allDayCells.nth(i);
    const cellText = await cell.innerText();
    const isDisabled = await cell.getAttribute('disabled');

    if (cellText.trim() === String(targetDay) && isDisabled === null) {
      console.log(`  → Clicking day: "${cellText}" at index ${i}`);
      await cell.click();
      dayClicked = true;
      break;
    }
  }

  if (!dayClicked) {
    throw new Error(`Day ${targetDay} not found or disabled in calendar`);
  }

  await this.page.waitForTimeout(300);

  // ── Step 6: Verify final value ────────────────────────────
  const enteredValue = await this.page
    .locator('input[name="dateOfBirthOrFormation"]')
    .inputValue();
  console.log(`  → DOB verified: "${enteredValue}"`);

  // Assert correct date was set
  const expectedFormatted = `${month.padStart(2,'0')}/${day.padStart(2,'0')}/${year}`;
  if (enteredValue !== expectedFormatted) {
    throw new Error(`DOB mismatch — expected: "${expectedFormatted}", got: "${enteredValue}"`);
  }
  console.log(`  → DOB confirmed correct ✅`);
}

  async enterBeneficiaryName(firstName, lastName) {
  await this.beneficiaryFirstNameInput.fill(firstName);
  await this.beneficiaryLastNameInput.fill(lastName);
  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}` // optional for downstream lookup
  };
}

async clickSave() {
  await this.saveButton.scrollIntoViewIfNeeded();
  await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
  await this.saveButton.click();
  await this.page.waitForLoadState('networkidle');
  console.log(`  → Save button clicked`);
}

 // Product Methods
  async navigateToProduct() {
    await this.scrollAndClick(this.addProductBtn);
    
    // await this.waitForVisible(this.productTypeSelect);
  }

 async selectProductType() {
  const productType = testData.product.type;
  console.log(`  → Selecting product type: "${productType}"`);

  // Click the Product dropdown to open it
  await this.productDropdown.scrollIntoViewIfNeeded();
  await this.productDropdown.waitFor({ state: 'visible', timeout: 10000 });
  await this.productDropdown.click();
  await this.page.waitForTimeout(300);

  // Use MUI listbox pattern — same as selectMUIDropdown in BasePage
  const listbox = this.page.getByRole('listbox');
  await listbox.waitFor({ state: 'visible', timeout: 10000 });

  // Select by role option with exact text
  const option = listbox.getByRole('option', { name: productType, exact: true });
  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click();
  await this.page.waitForTimeout(300);

  console.log(`  → Product type "${productType}" selected`);
}
  async enterAccountNickname() {
  const nickname = testData.account.nickname;
  console.log(`  → Entering account nickname: "${nickname}"`);

  await this.accountNicknameInput.waitFor({ state: 'visible', timeout: 10000 });
  await this.accountNicknameInput.clear();
  await this.accountNicknameInput.fill(nickname);
  console.log(`  → Nickname "${nickname}" entered`);
}

async enterExpectedDeposit() {
  const amount = testData.account.expectedDeposit;
  console.log(`  → Entering expected deposit: "${amount}"`);

  await this.expectedDepositInput.waitFor({ state: 'visible', timeout: 10000 });
  await this.expectedDepositInput.clear();
  await this.expectedDepositInput.fill(amount);
  console.log(`  → Expected deposit "${amount}" entered`);
  await this.page.locator('button:has(svg path[d*="M12 2"])').click();
  await this.page.locator('#terms').check();
  
}

async validateProductSuccessfullyAdded() {
    await expect(this.page.locator('text=Jacob- Premier Checking')).toBeVisible();
 
}
}

module.exports = { BeneficiaryProductPage };
