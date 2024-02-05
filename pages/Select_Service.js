const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.servicesPage=
class servicesPage{
    constructor(page){
        this.page=page;
        this.baseUrl = 'https://iremboui.uat.iremboinc.com/home/citizen/all_services';
        //this.serviceName ="Application for National ID";

    }

// Open url and choose language    
async openHomePage(chooseLanguage){
    await this.page.goto(this.baseUrl);
    const language = await this.page.locator('//*[@id="languageDropdown"]');
    console.log("The locator:", language)
    const getLangauge= await language.textContent()
    console.log("The language:", getLangauge)
    if (getLangauge !== chooseLanguage) {

        await expect(this.page.locator('#languageDropdown polyline')).toBeVisible()
        console.log("I reached here")
        await this.page.locator('#languageDropdown polyline').click();
        await this.page.getByText('English').click();
    } else {
        console.log('The langauage is in English.');
    }
    
    

}

//Validate the name of the service
async validateService(elementLocator,validName){

    const serviceLocator = await this.page.locator(elementLocator);
    console.log("locator name", serviceLocator )
    const serviceName = await serviceLocator.textContent();
    console.log("service name", serviceName );
    await expect(serviceName).toStrictEqual(validName);
    
 }
 //Choose the service
async selectService(elementLocator){

    await this.page.locator(elementLocator).click();
    
 }

}
