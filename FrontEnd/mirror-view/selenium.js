
const webdriver = require('selenium-webdriver');
const {By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');    

    
const run = async () => {
    const service = new chrome.ServiceBuilder('../../../chromedriver').build();
    chrome.setDefaultService(service);

    const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    await driver.get('http://localhost:3000/general');

    const info_div = await driver.findElement(By.className('ytplayer'));
    info_div.click();

    setTimeout(async () => {
        await driver.quit();
        process.exit(0);
      }, 3000);
}
run();