const { getDriver } = require('../Main/driver');
const { typeTextWithKeys } = require('../Main/writeText');
async function createPostFunction(driver) {
  if (driver == null) {
    driver = await getDriver();
  }
  try {
    const postButton = await driver.$('~TAG_CREATE_POST');
    await postButton.click();

    const postMessage = await driver.$('~TAG_POST_MESSAGE');
    await postMessage.click();
    await driver.pause(3000);
    await typeTextWithKeys(driver, 'Code for FireSocialMedia Auto Test');
    await driver.hideKeyboard();
    await driver.pause(1000); 
    const buttonUploadImage = await driver.$('~TAG_BUTTON_UPLOAD');
    await buttonUploadImage.click();
    await driver.pause(1000); // wait for upload options to appear
    const selectImage = await driver.$('~TAG_BUTTON_SELECTIMAGE');
    await selectImage.click();

    // Choose 11th image in gallery
    const images = await driver.$$('android.widget.ImageView');
    if (images.length > 0) {
      await images[10].click(); // safer to use 11th image
    } else {
      await driver.back();
    }

    await driver.pause(6000); // wait for image load

    const upPostButton = await driver.$('~TAG_BUTTON_POST');
    await upPostButton.click();
  } catch (error) {
    console.error('Error in createPostFunction:', error);
  }finally {
    await driver.pause(1000);
    //await driver.deleteSession();
  }
}

module.exports = { createPostFunction };
