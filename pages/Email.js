const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.emailPage=
class emailPage{
    constructor(page){
        this.page=page;
        this.baseUrl = 'https://mail.google.com/mail/u/3/#inbox';
        //this.goToLogin= 'button', { name: 'Log In' }
        
    }



async login(username,password){

    await this.page.goto(this.baseUrl);
    //await this.page.getByRole('link', { name: 'Sign in' }).click()
    await this.page.getByLabel('Email or phone').fill(username);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByLabel('Enter your password').fill(password);
    await this.page.getByRole('button', { name: 'Next' }).click()
    
 
 }
 // Method to check if a page with a specific URL is open and close it if found
 async closePageWithURL(url) {
    const pages = await this.page.context().pages(); // Get all open pages in the browser context

    // Find the page with the desired URL
    const pageToClose = pages.find(page => page.url() === url);

    if (pageToClose) {
      // Close the page if found
      await pageToClose.close();
      console.log('Page closed:', url);
    } else {
      console.log('Page not found:', url);
    }
  }


 //Choose the service
async openEmail(subject){
    

    const elementVisible= await this.page.getByLabel('Starred', { exact: true })
    if (elementVisible) {
        console.log('Element is visible');
        await this.page.getByLabel('Main menu').click();
      } else {
        console.log('Element is not visible page is full');
      }
    await this.page.getByRole('link', { name: subject}).click();
  }

  async runTest() {
    try {
        await this.eyes.setApiKey(apiKey);

        // Start the test and set the browser and viewport
        await this.eyes.open(page, 'Your App Name', 'Email', { width: 800, height: 600 });

        // Take a screenshot of the entire page
        await this.eyes.check('Main Page', Target.window().fully());

        // End the test (this will establish the first screenshot as the baseline)
        await this.eyes.close();
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the Applitools eyes session
        await this.eyes.abortIfNotClosed();
    }
}









}
