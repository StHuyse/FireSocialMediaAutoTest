const { getDriver } = require('./driver');

async function commentFunction() {
  const driver = await getDriver();

  try {
    const element = await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Code for FireSocialMedia Auto Test"))');
    await element.click();
    const commentButton = await driver.$('~TAG_BUTTON_COMMENT');
    await commentButton.click();
    const enterComment = await driver.$('~TAG_INPUT_COMMENT');
    await enterComment.click();
    await typeTextWithKeys(driver, 'Code vui vai luon');
    await driver.hideKeyboard();

    const sendComment = await driver.$('~TAG_BUTTON_SEND');
    await sendComment.click();
    await driver.pause(1000); // Wait for 1 seconds to observe the result

  } catch (error) {
    console.error('Error in commentFunction:', error);
  }finally {
    await driver.pause(1000);
    //await driver.deleteSession();
  }
}
async function typeTextWithKeys(driver, text) {
  for (const char of text) {
    await driver.keys(char);
  }
}

module.exports = { commentFunction };
