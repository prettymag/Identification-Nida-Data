//require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
/*const { servicesPage} = require('../pages/Select_Service.js');
const { product } = require('../pages/Products');
const { cart } = require('../pages/Cart');
const { personalDetails } = require('../pages/PersonalDetails');
const { payment } = require('../pages/Payment');
const { dispatchDetails } = require('../pages/Confirmation');*/


  test('Validation 1', async ({ page }) => {
    await page.goto('https://example.com');

    //Login
    /*const service= new servicesPage(page);
    await service.openHomePage();
    await service.validateService();
    await service.selectService();
    await page.waitForTimeout(2000)*/
  })