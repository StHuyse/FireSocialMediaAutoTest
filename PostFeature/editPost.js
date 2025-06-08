const getDriver = require('../Main/driver').getDriver;

async function editPostFunction() {
  const driver = await getDriver();

  try {
    const personalPageButton = await driver.$('~TAG_CURRENT_USER');
    await personalPageButton.click();
    // Scroll to the post with the specific text
    const postElement = await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Code for FireSocialMedia Auto Test"))');
    if (await postElement.isDisplayed()) {
      console.log('Post found');
    } else {
      console.log('Post not found');
      return;
    }
    await postElement.click();
    const moreOptionsButton = await driver.$('~TAG_BUTTONMORE');
    await moreOptionsButton.click();
    // //Delete the post if it exists
    // const deleteButton = await driver.$('~TAG_BUTTON_DELETE');
    // await deleteButton.click();

    // Click on the edit button
    const editButton = await driver.$('~TAG_BUTTON_EDIT');
    await editButton.click();

    // Clear the existing text in the input field
    const inputField = await driver.$('~TAG_INPUT_POST');
    await inputField.clearValue();

    // Type new text into the input field
    await inputField.setValue('Updated code for FireSocialMedia Auto Test');
    await driver.hideKeyboard();
    await driver.pause(1000); // Wait for 1 seconds to observe the result

    // Click on the save button
    const saveButton = await driver.$('~TAG_BUTTON_UPDATE');
    if (await saveButton.isDisplayed()) {
      console.log('Save button is displayed');
    } else {
      console.log('Save button is not displayed');
      return;
    }
    await saveButton.click();

    await driver.pause(1000); // Wait for 1 seconds to observe the result

  } catch (error) {
    console.error('Error in editPostFunction:', error);
  } finally {
    await driver.pause(1000);
  }
}

module.exports = { editPostFunction };
