const getDriver = require('./driver').getDriver;
const { typeTextWithKeys } = require('./writeText');
async function sendFriendRequestFunction() {
    const driver = await getDriver();
    
    try {
        await driver.pause(2000);
        const findFriendsButton = await driver.$('~TAG_ICON_BUTTON_SEARCH');
        if (await findFriendsButton.isDisplayed()) {
            console.log('Find Friends button is displayed');
        } else {
            console.log('Find Friends button is not displayed');
            return;
        }
        await findFriendsButton.click();
    
        // Search for a user by username
        const searchField = await driver.$('~TAG_SEARCH_BAR');
        await searchField.click();
        await typeTextWithKeys(driver, 'husss');
        await driver.hideKeyboard();

        // Touch big column to scroll and choose the first user
        const userColumn = await driver.$('~TAG_PEOPLE_COLUMN');
        if (await userColumn.isDisplayed()) {
            await userColumn.click();
        } else {
        console.log('No users found');
        return;
        }
        const userName = await driver.$('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("husss"))');
        if (await userName.isDisplayed()) {
            console.log('User found');
        } else {
            console.log('User not found');
            return;
        }
        await userName.click();
        // Click on the "Add Friend" button
        const sendRequestButton = await driver.$('~TAG_BUTTON_ADDFRIEND');
        if (await sendRequestButton.isDisplayed()) {
            console.log('Send Friend Request button is displayed');
        } else {
            console.log('Send Friend Request button is not displayed');
            return;
        }
        
        if (await sendRequestButton.isDisplayed()) {
        await sendRequestButton.click();
        console.log('Friend request sent successfully');
        } else {
        console.log('Send Friend Request button not found');
        return;
        }
    
    } catch (error) {
        console.error('Error in sendFriendRequestFunction:', error);
    } finally {
        await driver.pause(1000);
    }
}

// async function typeTextWithKeys(driver, text) {
//   for (const char of text) {
//     await driver.keys(char);
//   }
// }
module.exports = {
    sendFriendRequestFunction
};
