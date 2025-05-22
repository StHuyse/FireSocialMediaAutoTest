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

// Function to type text using key events
async function typeTextWithKeys(driver, text) {
  const actions = text.split('').map(char => ({ type: 'keyDown', value: char }));

  await driver.performActions([
    { type: 'key', id: 'keyboard', actions }
  ]);

  await driver.releaseActions();
}

// Sign-in function
async function signInFunction(driver) {
  try {
    // Handle permission popup if exists
    try {
      const permissionButton = await driver.$('//*[@text="Cho phép"]');
      if (await permissionButton.isDisplayed()) {
        await permissionButton.click();
      }
    } catch (e) {
      // No permission popup
    }

    const usernameField = await driver.$('~TAG_USERNAME');
    await usernameField.click();
    await typeTextWithKeys(driver, 'khua01@gmail.com');

    const passwordField = await driver.$('~TAG_PASSWORD');
    await passwordField.click();
    await typeTextWithKeys(driver, '123456');
    await driver.hideKeyboard();

    const rememberPassword = await driver.$('~TAG_REMEMBERPASSWORD');
    await rememberPassword.click();

    const signin = await driver.$('~TAG_BUTTON_SIGNIN');
    await signin.click();

    await driver.pause(2000); // Give time for login transition
  } catch (error) {
    console.error('Error in signInFunction:', error);
  }
}

// Post function
async function postFunction(driver) {
  try {
    const postButton = await driver.$('~TAG_CREATE_POST');
    await postButton.click();

    const postMessage = await driver.$('~TAG_POST_MESSAGE');
    await postMessage.click();
    await typeTextWithKeys(driver, 'Hello World');
    await driver.hideKeyboard();

    const selectImage = await driver.$('~TAG_BUTTON_SELECTIMAGE');
    await selectImage.click();

    // Choose 1st image in gallery
    const images = await driver.$$('android.widget.ImageView');
    if (images.length > 0) {
      await images[9].click(); // safer to use 9
    } else {
      await driver.back();
    }

    await driver.pause(5000); // wait for image load

    const upPostButton = await driver.$('~TAG_BUTTON_POST');
    await upPostButton.click();
  } catch (error) {
    console.error('Error in postFunction:', error);
  }
}

// Main function
(async () => {
  const driver = await remote(wdOpts);
  try {
    await signInFunction(driver);
    await postFunction(driver);
  } catch (error) {
    console.error('Automation error:', error);
  } finally {
    await driver.pause(2000);
    //await driver.deleteSession(); // if need to close the session
  }
})();
