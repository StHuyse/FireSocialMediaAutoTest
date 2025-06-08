const {getDriver} = require('../Main/driver');

async function acceptFriendFunction() {
    const driver = await getDriver();
    
    try{
        const notiButton = await driver.$('~TAG_NOTIFICATION_BOTTOM');
        await notiButton.click();
        const notiList = await driver.$$('~TAG_NOTIFICATION_LIST');
        const notiCount = await notiList.length;
        if (notiCount > 0) {
            await notiList[0].click();
        }
        const acceptButton = await driver.$('~TAG_BUTTON_ADDFRIEND');
        await acceptButton.click();
        await driver.pause(1000);
        const acceptOption = await driver.$('android=new UiSelector().className("android.widget.TextView").text("Accept")')
        if (acceptOption == null) {
            console.log('Accept option not found');
            return;
        }
        await acceptOption.click();

        // //if accept
        // const confirmButton = await driver.$('~TAG_ACCEPT_BUTTON');
        // await confirmButton.click();
        //if denied
        // const deniedRequest = await driver.$('~TAG_REJECT_BUTTON');
        // await deniedRequest.click();

        //click "Add Friend" button to Unfriend(reset) for testing purposes
        const deniedButton = await driver.$('~TAG_BUTTON_ADDFRIEND');
        await deniedButton.click();
    }catch (error) {
        console.error('Error in acceptFriendFunction:', error);
    }
}
module.exports = { acceptFriendFunction };