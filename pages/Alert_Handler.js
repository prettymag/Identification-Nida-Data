const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.alertHandler=
class alertHandler{
    constructor(page) {
        this.page = page;
    }

    async handleAlerts() {
        // Listen for dialog events (alerts, confirms, prompts, etc.)
        this.page.on('dialog', async dialog => {
            console.log(`Dialog of type '${dialog.type()}' detected.`);
            console.log(`Dialog message: ${dialog.message()}`);
            if (dialog.type() === 'beforeunload'){
            await dialog.accept();
        }else{
            await dialog.dismiss();
        }
        })
       
    }

    
}