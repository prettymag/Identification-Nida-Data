const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.servicesPage=
class servicesPage{
    constructor(page){
        this.page=page;
        this.baseUrl = process.env.BASE_URL;
        //this.goToLogin= 'button', { name: 'Log In' }
        this.usernameField ='Enter phone number';
        this.passwordfield='Enter Password'
        this.loginButton='[type="submit"]'
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

async login(username,password){

    await this.page.getByRole('button', { name: 'Log In' }).click()
    await this.page.getByPlaceholder(this.usernameField).fill(username);
    await this.page.getByPlaceholder(this.passwordfield).fill(password);
    await this.page.locator(this.loginButton).click();
    
 
 }

//Validate the name of the service
async validateService(elementLocator,number,validName){

    const serviceLocator = await this.page.getByText(elementLocator).first(number)
    console.log("locator name", serviceLocator )
    const serviceName = await serviceLocator.textContent();
    console.log("service name", serviceName );
    await expect(serviceName).toStrictEqual(validName);
    
 }
 //Choose the service
async selectService(elementLocator,number){

    await this.page.getByText(elementLocator).first(number).click();
    
 }

}
