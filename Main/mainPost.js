const { signInFunction } = require('../SignInFeature/signIn');
const { getDriver } = require('./driver');
const { createPostFunction } = require('../PostFeature/post');
async function runSignInPost() {
  const driver = await getDriver();
  await driver.pause(1000);
  await signInFunction();
  await driver.pause(5000);
  await createPostFunction(driver);
}
runSignInPost().catch(console.error);