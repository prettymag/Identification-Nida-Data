const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.paymentPage=
class paymentPage{
    constructor(page){
        this.page=page;
   
    }


//Validate the next steps
async validateNextSteps(locator,step,condition = false){
    //Validate step1
    const stepLocator = await this.page.getByText(locator,{ exact: condition })
    console.log("locator name", stepLocator )
    const stepText = await stepLocator.textContent();
    console.log("service name", stepText );
    await expect(stepText).toStrictEqual(step);

    
 }
 //Validate the charge and billing ID
async validatePaymentDetails(cost,billingID){
    //Validate cost
    const serviceCostLocator= await this.page.getByText(cost)
    console.log("erviceCostLocator", serviceCostLocator)
    const serviceCost = await serviceCostLocator.textContent();
    console.log("service name", serviceCost );
    await expect(serviceCost).toStrictEqual(cost);
    
    //Check if BilliID is there

    const billingIDLocator= await this.page.locator("//*[contains(text(), 'Bill ID')]")
    console.log("billingIDLocator", billingIDLocator)
    const billingIDText = await billingIDLocator.textContent();
    console.log("billingID", billingIDText );
    await expect(billingIDText).toContain(billingID);
    // Click Pay
    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', { name: 'Pay' }).click();
   

}
 //Validate Application Number
 async validateApplicationNumber(applicationNumber){
    
    
    //Check if Application Number

    const applicationNumberLocator= await this.page.getByRole('heading', { name: applicationNumber })
    console.log("applicationNumberLocator", applicationNumberLocator)
    const applicationIDText = await applicationNumberLocator.textContent();
    console.log("applicationIDText", applicationIDText );
    await expect(applicationIDText).toContain(applicationNumber);
    
}


//Validate the next steps
async momoPay(momoPhone,payButton,price){
    //Validate step1
   
    await this.page.getByPlaceholder('ex: 078/9xxxxxxx').fill(momoPhone);
    //await this.page.waitForTimeout(5000)
    await this.page.click('body');
    await this.page.getByRole(payButton, { name:  price}).click()

 }
 async payByCard(payButton,price){
  await this.page.locator('label').filter({ hasText: 'Debit / Credit card' }).locator('span').nth(1).click();
  await this.page.getByPlaceholder('Name on card').fill('Test');
  await this.page.getByPlaceholder('3141 1315 13414').fill('5111 1111 1111 1118');
  //await this.page.getByPlaceholder().fill('5111 1111 1111 1118').click();
  await this.page.getByPlaceholder('MM / YYYY').click();
  await this.page.getByPlaceholder('MM / YYYY').fill('05 / 24');
  await this.page.getByPlaceholder('MM / YYYY').press('Tab');
  await this.page.getByPlaceholder('CVV').fill('100');
  await this.page.getByRole(payButton, { name:  price}).click()
 }

}



// async occupationDetails(locatorReason,reasonText,roleReason, reason){
   
//         await this.page.locator(locatorReason).filter({ hasText: reasonText, }).getByRole('textbox').click();// click dropdown menu
//         //Get reason of DOB
//         await this.page.getByRole(roleReason, { name: reason }).click()
//         await this. page.click('body')
//     };// click dropdown menu