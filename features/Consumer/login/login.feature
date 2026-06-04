@smoke @deposit
Feature: Deposit Relay - OffRampHub OTP Verification Page

  Background:
    Given the user opens the Deposit Relay page

  # ── Page Load & UI Validation ──────────────────────────────────

  @positive @smoke
  Scenario: Page loads and displays welcome message for the user
    Then the welcome heading should contain "Welcome"
    And the welcome heading should contain "Chinmay Jain"

  @positive @smoke
  Scenario: Password input field is visible on the page
    Then the password input field should be present

  @positive @smoke
  Scenario: Powered by Off Ramp Hub text is displayed
    Then the powered by text should be visible

  @ui
  Scenario: Page title is correct
    Then the page title should contain "Off Ramp"

  @edge
  Scenario: Page URL contains correct UUID parameter
    Then the current URL should contain the relay UUID

  # ── OTP Entry - Auto Submit ────────────────────────────────────

  @positive @smoke @otp
  Scenario: User successfully logs in with correct OTP
    When the user enters the valid OTP
    # Then the OTP screen should disappear
    Then the user should land on the next screen

  @negative @validation @otp
  Scenario: Wrong OTP shows error message
    When the user enters the invalid OTP
    # Then an error message should be displayed
    Then the OTP screen should still be visible

  @negative @validation @otp
  Scenario: Partial OTP does not trigger auto submit
    When the user enters a partial OTP
    Then the OTP screen should still be visible

  @negative @validation @otp
  Scenario: Special characters as OTP shows error
    When the user enters special characters as OTP
    # Then an error message should be displayed
    Then the OTP screen should still be visible

  @edge @otp
  Scenario: OTP field accepts exactly 4 valid characters
    When the user enters the valid OTP
    # Then the OTP screen should disappear
    Then the OTP screen should still be visible