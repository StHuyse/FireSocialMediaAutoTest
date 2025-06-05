 const { signInFunction } = require('./signIn');
// const { commentFunction } = require('./comment');
const { getDriver } = require('./driver');
const { sendFriendRequestFunction } = require('./sendFriendRequest');

// (async () => {
  
//   await signInFunction();
//   await createPostFunction();
//   await commentFunction();
//   const driver = await getDriver();
//   await driver.pause(1000);
//   await driver.deleteSession();
// })();


async function letSendFriendRequestFunction() {
  const driver = await getDriver();
  await signInFunction();
  await sendFriendRequestFunction(driver);
}
letSendFriendRequestFunction().catch(console.error);
