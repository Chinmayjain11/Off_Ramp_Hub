const { Given, When, Then } = require('@cucumber/cucumber');
const { BeneficiaryProductPage } = require('../pages/BeneficiaryProductPage');
const { expect } = require('@playwright/test');
const testData = require('../utils/testDataFactory');


Then('the user clicks on Lets get started button', async function () {
  await this.page.getByRole('button', { name: "Let's Get Started" }).click();
  });

Then('the user clicks on Got it button', async function () {
  await this.page.getByRole('button', { name: 'Got it!' }).click();
  });
// ──── Beneficiary Steps ──────────────────────────────────────────────────

When('the user navigates to add beneficiary', async function () {
  const beneficiaryPage = new BeneficiaryProductPage(this.page);
  await beneficiaryPage.navigateToBeneficiary();
  this.beneficiaryPage = beneficiaryPage;
});

When('the user clicks on upload later option', async function () {
  await this.page.getByText('Upload Later').click();
  });

When('the user enters beneficiary details', async function () {
  await this.beneficiaryPage.enterBeneficiaryName(
    testData.beneficiary.firstName,
    testData.beneficiary.lastName
  );
});

When('the user clicks on next button', async function () {
  await this.page.locator('button[type="button"]:has-text("Next")').click();
});

When('the user selects the beneficiary sex', async function () {
  await this.beneficiaryPage.selectBeneficiarySex(
    testData.beneficiary.sex
  );
});

When('the user enters DOB', async function () {
  
  await this.beneficiaryPage.enterDOB(testData.beneficiary.dob);
});

When('the user clicks on save button', async function () {
  await this.beneficiaryPage.clickSave();
});


// ──── Product Steps ──────────────────────────────────────────────────────

When('the user navigates to add product', async function () {
  const productPage = new BeneficiaryProductPage(this.page);
  await productPage.navigateToProduct();
  this.productPage = productPage;
});

When('the user is able to select the product type', async function () {
  await this.beneficiaryPage.selectProductType();
});

When('the user is able to enter Account NickName', async function () {
  await this.beneficiaryPage.enterAccountNickname();
});

When('the user is able to enter Expected Deposit', async function () {
  await this.beneficiaryPage.enterExpectedDeposit();
});

Then('the user should be able validate the product is successfully added', async function () {
    await this.beneficiaryPage.validateProductSuccessfullyAdded();
});