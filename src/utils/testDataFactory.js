const testData = {
  // OTP data
  validOTP: 'bbb7',
  invalidOTP: '0000',
  partialOTP: 'bb',
  specialCharsOTP: '!@#$',
  tooLongOTP: 'bbb7bbb7',

  // URL data
  relayUUID: 'b788b38d-ea38-4f64-8c52-9cdcfcaeb2f9',

  beneficiary: {
    firstName: 'John',
    lastName: 'Doe',
    dob: '10/11/1991',      // MM/DD/YYYY format
    sex: 'Male',
    ssnType: 'SSN',
    taxId: '123-45-6789',
    residence: 'United States of America',
    citizenship: 'United States of America'
  },

  // Product data
product: {
  type: 'Premier Checking'
},
// Account data
account: {
  nickname: 'Jacob',
  expectedDeposit: '1000'
}
};

module.exports = testData;