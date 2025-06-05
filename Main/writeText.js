const getDriver = require('./driver').getDriver;
async function typeTextWithKeys(driver, text) {
  if (!driver) {
    driver = await getDriver();
  }
  
  for (const char of text) {
    await driver.keys(char);
  }
}

module.exports = { typeTextWithKeys };