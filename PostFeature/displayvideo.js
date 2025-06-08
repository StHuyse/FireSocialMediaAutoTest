const {getDriver} = require('../Main/driver');
async function displayVideoPost() {
  const drive = await getDriver();
  try{
    await drive.pause(1000);
    const playButton = await $('//android.widget.ImageView[@content-desc="Play"]');
    await playButton.click();
  } catch (error) {
    console.error('Error in displayVideoPost:', error);
  } finally {
    await drive.pause(1000);
    //await drive.deleteSession();
  }
}


module.exports = { displayVideoPost };
