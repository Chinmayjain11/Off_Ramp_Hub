# Off Ramp Hub - Test Automation Framework

## Overview

This repository contains a scalable and maintainable test automation framework developed for the Off Ramp Hub application using Playwright, Cucumber BDD, and JavaScript.

The framework has been designed following industry-standard automation practices with a strong emphasis on:

* Maintainability
* Reusability
* Scalability
* Readability
* Cross-browser compatibility
* Code quality

The framework supports automation of multiple business workflows including Consumer and Entity journeys.

---

## Technology Stack

| Technology              | Purpose                             |
| ----------------------- | ----------------------------------- |
| Playwright              | End-to-End Web Automation           |
| JavaScript (ES6+)       | Programming Language                |
| Cucumber BDD            | Behavior Driven Development         |
| Node.js                 | Runtime Environment                 |
| ESLint                  | Static Code Analysis & Code Quality |
| Dotenv                  | Environment Configuration           |
| Playwright HTML Reports | Execution Reporting                 |
| GitHub                  | Source Control                      |

---

## Framework Design Principles

The framework follows a layered architecture:

### Page Object Model (POM)

UI locators and page actions are encapsulated within Page Objects to improve maintainability and reduce code duplication.

### Reusable Base Page

A centralized BasePage implementation contains common utilities such as:

* Navigation
* Synchronization
* Scrolling
* Click actions
* Screenshot capture
* Generic dropdown handling
* Dynamic element interaction

### Custom World Implementation

Cucumber World has been customized to:

* Manage browser lifecycle
* Share execution context
* Maintain page state across steps
* Improve test isolation

### Configuration Driven Design

Environment-specific values are externalized through `.env` files allowing seamless execution across environments.

---

## Business Workflows Covered

### Consumer Workflow

* User Authentication
* Beneficiary Management
* Product Selection
* Application Submission
* Validation Scenarios

### Entity Workflow

* User Authentication
* Beneficiary Management
* Product Selection
* Application Submission
* Validation Scenarios

---

## Framework Structure

src/
├── features/
│ ├── consumer/
│ └── entity/
│
├── pages/
│ ├── BasePage.js
│ ├── LoginPage.js
│ ├── BeneficiaryProductPage.js
│ └── ...
│
├── steps/
│ ├── consumer/
│ ├── entity/
│ └── common/
│
├── support/
│ ├── hooks/
│ ├── world/
│ └── utilities/
│
├── reports/
├── screenshots/
└── videos/

---

## Key Features

### Cross Browser Execution

Framework supports:

* Chromium
* Firefox
* WebKit

### Screenshot Capture

Automatic screenshot capture on failure for easier debugging.

### Video Recording

Execution videos are generated to assist with troubleshooting and root cause analysis.

### Environment Configuration

Environment-specific values are managed using dotenv.

### Reusable Synchronization

Custom synchronization mechanisms have been implemented to reduce flaky test executions.

### Modular Workflow Design

The framework has been structured to easily support future business workflows without impacting existing automation.

---

## Code Quality

### ESLint Integration

ESLint has been integrated to enforce coding standards and improve maintainability.

Benefits include:

* Consistent coding style
* Early defect detection
* Improved code readability
* Reduced technical debt
* Better collaboration across teams

Example execution:

npm run lint

or

npx eslint .

---

## Execution Commands

Install dependencies:

npm install

Run Smoke Suite:

npm run smoke

Run Regression Suite:

npm run regression

Run End-to-End Suite:

npm run e2e

Run OTP Suite:

npm run otp

Run ESLint Validation:

npm run lint

---

## Reporting

The framework generates:

* Execution Reports
* Screenshots
* Videos

These artifacts assist in debugging and provide execution traceability.

---

## Engineering Considerations

While implementing the framework, the focus was not limited to automating the required scenarios. Equal emphasis was placed on:

* Framework architecture
* Scalability
* Reusability
* Maintainability
* Code quality
* Test stability
* Ease of onboarding for future contributors

---

## Future Enhancements

* CI/CD Integration using GitHub Actions
* Dockerized Test Execution
* Allure Reporting
* API Automation Layer
* Database Validation Layer
* Parallel Execution Optimization
* Test Data Management Framework

---

## Author

Chinmay Jain


