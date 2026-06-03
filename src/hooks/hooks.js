const { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } = require('@cucumber/cucumber');

// Set global step timeout to 60 seconds
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  console.log('\n🏦 OffRampHub Automation Suite Starting...\n');
});

Before(async function (scenario) {
  console.log(`\n▶  Starting: ${scenario.pickle.name}`);
  await this.init();
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    if (this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
      console.log(`📸  Screenshot attached for failed scenario`);
    }
  }
  const icon = scenario.result?.status === Status.PASSED ? '✅' : '❌';
  console.log(`${icon}  ${scenario.pickle.name}`);
  await this.teardown();
});

AfterAll(async function () {
  console.log('\n✔  Suite complete — check reports/ folder for results.\n');
});