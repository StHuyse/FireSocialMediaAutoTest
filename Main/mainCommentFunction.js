const {getDriver} = require('./driver');
const {signInFunction} = require('../SignInFeature/signIn');
const {commentFunction} = require('../PostFeature/comment');

async function mainCommentFunction() {
    const driver = await getDriver();
    await signInFunction(driver);
    await driver.pause(3000);
    await commentFunction(driver);
}

mainCommentFunction().catch(console.error);
