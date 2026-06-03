# Off Ramp Hub - UI Automation Framework

## Overview

This project is an automated test framework built using **Playwright** and **JavaScript** to validate the core functionalities of the Off Ramp Hub application.

The framework follows industry-standard automation practices including:
- Page Object Model (POM)
- Reusable utilities
- Data-driven testing approach
- Playwright Test Runner
- HTML Reporting

---

## Technology Stack

| Technology | Version |
|------------|----------|
| Node.js | Latest LTS |
| Playwright | Latest |
| JavaScript | ES6+ |
| Playwright Test | Latest |

---

## Framework Structure

```
project-root/
├── features/
│   ├── login/
│   │   └── login.feature
│   └── transfer/
│       └── transfer.feature
├── src/
│   ├── pages/
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── TransferPage.js
│   ├── steps/
│   │   ├── login.steps.js
│   │   └── transfer.steps.js
│   ├── hooks/
│   │   └── hooks.js
│   ├── world/
│   │   └── CustomWorld.js
│   └── utils/
│       ├── logger.js
│       ├── testDataFactory.js
│       └── configLoader.js
├── test-data/
├── reports/
├── .env
├── cucumber.js
└── package.json
└── README.md
```

---

## Prerequisites

Before executing the tests, ensure the following are installed:

- Node.js (v18 or above)
- Git
- Playwright

Verify installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd Off_Ramp_Hub
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

### Execute all tests

```bash
npx playwright test
```

### Execute a specific test

```bash
npx playwright test tests/example.spec.js
```

### Execute in headed mode

```bash
npx playwright test --headed
```

### Execute on a specific browser

```bash
npx playwright test --project=chromium
```

---

## Test Reports

Generate and open Playwright HTML Report:

```bash
npx playwright show-report
```

Reports are generated automatically after test execution.

---

## Framework Features

- Cross-browser execution
- Parallel test execution
- Page Object Model design
- Reusable locators and methods
- Detailed HTML reports
- Screenshot capture on failure
- Easy maintenance and scalability

---

## Assumptions

- Test environment is stable and accessible.
- Test data used is non-production data.
- Application URLs and credentials are configurable.

---

## Future Enhancements

- CI/CD integration using GitHub Actions or GitLab CI
- API automation integration
- Data-driven execution from external files
- Allure reporting
- Docker-based execution
- AI-assisted test generation

---

## Author

**Chinmay Jain**

Senior QA Automation Engineer

Expertise:
- Playwright
- Selenium
- API Automation
- Java
- JavaScript
- CI/CD
- Quality Engineering

---
