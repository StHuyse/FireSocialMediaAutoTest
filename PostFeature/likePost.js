const { getDriver } = require('../Main/driver');

async function likePostFunction() {
  const driver = await getDriver();

  try {
    // Scroll to the post with the specific text
    const postElement = await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Code for FireSocialMedia Auto Test"))');
    await postElement.click();
//Like the post
    await driver.pause(1000);
    const likeButton = await driver.$('~TAG_BUTTON_LIKE');
    await likeButton.click();


    await driver.pause(1000);
  } catch (error) {
    console.error('Error in likePostFunction:', error);
  } finally {
    await driver.pause(1000);
    //await driver.deleteSession();
  }
}

module.exports = { likePostFunction };
