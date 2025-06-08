 const { signInFunction } = require('../SignInFeature/signIn');
const { getDriver } = require('./driver');
const { sendFriendRequestFunction } = require('../FriendFeature/sendFriendRequest');


async function letSendFriendRequestFunction() {
  const driver = await getDriver();
  await signInFunction();
  await sendFriendRequestFunction(driver);
}
letSendFriendRequestFunction().catch(console.error);
