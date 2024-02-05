const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.serviceDescription=
class serviceDescription{
    constructor(page){
        this.page=page;
        

    }




//Validate the name of the service
async validateService(elementLocator,validName){

    const serviceLocator = await this.page.getByRole(elementLocator);
    console.log("locator name", serviceLocator )
    const serviceName = await serviceLocator.textContent();
    console.log("service name", serviceName );
    await expect(serviceName).toStrictEqual(validName);
    
 }
 //Choose the service
async selectServiceDesPage(dropDown,label,serviceLocatorDes){
    await this.page.locator(dropDown).click();
    //await this.page.getByText('Application for National ID').first().click()
    //await this.page.locator(serviceLocatorDes).click();
    //await this.page.getByLabel(label).and(this.page.getByText(serviceLocatorDes)).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option', { name: 'Application for National ID' }).click()
    await this.page.waitForTimeout(2000);
}

//Validate the processing time, service charge and the provider
async validateServiceDesciption(processingTime,serviceCharge,providedBy,options1){

    const locateProcessingTime=await this.page.getByText(processingTime )
    const serviceProcessingTime = await locateProcessingTime.textContent();
    console.log("Time is",serviceProcessingTime)
    await expect(serviceProcessingTime).toStrictEqual(processingTime);
    const cost= await this.page.getByText(serviceCharge);
    const serviceCost = await cost.textContent();
    console.log("Expense is",serviceCost)
    await expect(serviceCost).toStrictEqual(serviceCharge);
    const serviceProvision = await this.page.getByText(providedBy,options1);
    const provider = await serviceProvision.textContent();
    console.log("Expense is",provider)
    await expect(provider).toStrictEqual(providedBy,options1);

 }

 //Continue the next page and validate it
async clickAppy(role, options2,URL){

    await this.page.getByRole(role,options2).click();
    await this.page.waitForTimeout(2000);
    // const detailsURL = this.page.url();
    // console.log("The details url is",detailsURL)
    // await expect(detailsURL).toContain(URL);

 }

}
