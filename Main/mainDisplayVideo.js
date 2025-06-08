const {displayVideoPost} = require('../PostFeature/displayvideo');
const { getDriver } = require('../Main/driver');
const {signInFunction} = require('../SignInFeature/signIn');
async function mainDisplayVideo() {
    const driver = await getDriver();
    await signInFunction(driver);
    await displayVideoPost(driver);
    await driver.pause(1000);
}

mainDisplayVideo().catch(console.error);
