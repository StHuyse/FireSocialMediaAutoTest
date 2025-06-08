const { getDriver } = require('../Main/driver');

async function typeTextWithKeys(driver, text) {
  const actions = text.split('').map(char => ({ type: 'keyDown', value: char }));

  await driver.performActions([{ type: 'key', id: 'keyboard', actions }]);
  await driver.releaseActions();
}

async function signInFunction() {
  const driver = await getDriver();

  try {
    try {
      const permissionButton = await driver.$('//*[@text="Cho phép"]');
      if (await permissionButton.isDisplayed()) {
        await permissionButton.click();
      }
    } catch (_) {}

    const usernameField = await driver.$('~TAG_USERNAME');
    await usernameField.click();
    await typeTextWithKeys(driver, 'khua05@gmail.com');

    const passwordField = await driver.$('~TAG_PASSWORD');
    await passwordField.click();
    await typeTextWithKeys(driver, '123456');
    await driver.hideKeyboard();

    const rememberPassword = await driver.$('~TAG_REMEMBERPASSWORD');
    await rememberPassword.click();

    const signin = await driver.$('~TAG_BUTTON_SIGNIN');
    await signin.click();

    await driver.pause(2000);
  } catch (error) {
    console.error('Error in signInFunction:', error);
  }
}

module.exports = { signInFunction };
