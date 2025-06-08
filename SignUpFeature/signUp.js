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



//async makes a function return a Promise
//await makes a function wait for a Promise
// Enter the app
async function signUpFunction() {
  const driver = await remote(wdOpts);
  try {

    // notification click
    const notificationItem = await driver.$('//*[@text="Cho phép"]');
    await notificationItem.click();

    // Click on the "Sign Up" button
    const signUpButton = await driver.$('~TAG_BUTTON_SIGNUP');
    await signUpButton.click();

    const usernameField = await driver.$('~TAG_USERNAME');
await usernameField.click();  // Focus the field first

await typeTextWithKeys(driver, 'khua20@gmail.com');


const passwordField = await driver.$('~TAG_PASSWORD');
await passwordField.click();  // Focus the field first

await typeTextWithKeys(driver, '123456');

await driver.hideKeyboard();

const confirmPasswordField = await driver.$('~TAG_CONFIRMPASSWORD');
await confirmPasswordField.click();  // Focus the field first
await typeTextWithKeys(driver, '123456');
await driver.pause(1000); // Wait for 1 second to observe the result

await driver.hideKeyboard();



const signup = await driver.$('~TAG_BUTTON_SIGNUP');
await signup.click();


await driver.pause(1000); // Wait for 1 second to observe the result
const signUpAvatar = await driver.$('~TAG_SELECT_AVATAR');
await signUpAvatar.click();


//Choose 1st image in gallery
const images = await driver.$$('android.widget.ImageView');
if (images.length > 0) {
    // Click on the first image
    await images[9].click();
} else {
    await driver.back();
}
//Wait for the image to load
await driver.pause(1000); // Wait for 1 seconds to observe the result
//Enter the name
const nameField = await driver.$('~TAG_SELECT_NAME');
await nameField.click();  // Focus the field first
await typeTextWithKeys(driver, 'khua');
await driver.hideKeyboard();

// Confirm avatar selection
const confirmBtn = await driver.$('~TAG_BUTTON_NEXT');
await confirmBtn.click();

} finally {
    await driver.pause(1000);
    //await driver.deleteSession();
  }
}

// Function to type text using key events
async function typeTextWithKeys(driver, text) {
  const actions = text.split('').map(char => ({ type: 'keyDown', value: char }));

  await driver.performActions([
    { type: 'key', id: 'keyboard', actions }
  ]);

  await driver.releaseActions();
}

signUpFunction().catch(console.error);