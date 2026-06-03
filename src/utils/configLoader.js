require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL,
  depositRelayPath: process.env.DEPOSIT_RELAY_PATH,
  headless: process.env.HEADLESS !== 'false',
  browser: process.env.BROWSER || 'chromium',
  timeout: parseInt(process.env.TIMEOUT || '30000'),
  retries: parseInt(process.env.RETRIES || '1')
};

module.exports = config;