@e2e @beneficiary-product @smoke
Feature: Add Beneficiary and Product - OffRampHub End-to-End Flow

  Background:
     Given the user opens the Deposit Relay page

  # ── End-to-End Beneficiary & Product Flow ──────────────────────────────────

  @positive @smoke @e2e
  Scenario: User successfully logs in, adds beneficiary, product and completes transaction
    When the user enters the valid OTP
    Then the user should land on the next screen
    Then the user clicks on Lets get started button
    Then the user clicks on Got it button
    

    When the user navigates to add beneficiary
    And the user clicks on upload later option
    And the user enters beneficiary details
    And the user clicks on next button
    And the user clicks on next button
    And the user clicks on next button
    And the user selects the beneficiary sex
    And the user enters DOB
    And the user clicks on next button
    And the user clicks on next button
    And the user clicks on next button
    And the user clicks on save button


    When the user navigates to add product
    And the user is able to select the product type
    And the user is able to enter Account NickName
    And the user is able to enter Expected Deposit
    Then the user should be able validate the product is successfully added
  

 