const {getDriver} = require('./driver');
const {signInFunction} = require('../SignInFeature/signInForFriendFunc');
const {acceptFriendFunction} = require('../FriendFeature/acceptFriend');

async function mainAcceptRequestFunction() {
    const driver = await getDriver();
    await signInFunction(driver);
    await driver.pause(1000);
    await acceptFriendFunction(driver);
}
mainAcceptRequestFunction().catch(console.error);