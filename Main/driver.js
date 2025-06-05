// driver.js
const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:appPackage': 'com.minhtu.firesocialmedia',
  'appium:appActivity': '.android.MainActivity',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

let driverInstance;

async function getDriver() {
  if (!driverInstance) {
    driverInstance = await remote(wdOpts);
  }
  return driverInstance;
}

module.exports = { getDriver };
