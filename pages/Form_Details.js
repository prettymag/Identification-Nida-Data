const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.formDetails=
class formDetails{
    constructor(page){
        this.page=page;
        

    }




//Validate the name of the service
async validateTitle(titleName){

    const locator = await this.page.getByRole('heading', { name: 'Application for National ID', exact: true });
    console.log("Title locator name", locator )
    const name = await locator.textContent();
    console.log("Title service name", name );
    await expect(name).toStrictEqual(titleName);
    
 }
 //Validate applicant details
 async validateApplicantDetails(applicantDetails){
    const locatorAplicantDetails= await this.page.getByText(applicantDetails);
    console.log("Title locator name applicant details", locatorAplicantDetails )
    const nameAplicantDetails = await locatorAplicantDetails.textContent();
    console.log("Applicant details", nameAplicantDetails);
    await expect(nameAplicantDetails).toStrictEqual(applicantDetails);
    
  }

 //Choose the service
async childDetails(childIDLocator,childID,childName,childYOB,childNameLocator,childDOB,childMOB){
  await this.page.getByPlaceholder(childIDLocator).click();
  await this.page.getByPlaceholder(childIDLocator).fill(childID);
  const verification= await this.page.getByText('remboGov wants to verify that')
  console.log("Verificationt details locator", verification )
  const verificationDetails = await verification.textContent();
  console.log("Applicant details", verificationDetails);
// choose either to use name or date of birth for verification
  if (verificationDetails.includes("names of the child")) {
    await this.page.getByPlaceholder(childNameLocator).fill(childName);
    await this.page.locator('#mat-checkbox-4 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();//checkbox
    await this.page.getByRole('button', { name: 'Verify' }).click();//click okay
   } else {
    
    await this.page.getByRole('textbox', { name: 'Select date' }).click();//click date locator
    await this.page.getByLabel('Choose month and year').click();//choose the month and year
    await this.page.getByLabel(childYOB).click();
    await this.page.getByLabel(childMOB).click();
    await this.page.getByLabel(childDOB).click();
    await this.page.locator('#mat-checkbox-4 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
    await this.page.getByRole('button', { name: 'Verify' }).click();
    }
}

// //Validate the processing time, service charge and the provider
// async validateServiceDesciption(processingTime,serviceCharge,providedBy,options1){

//     const locateProcessingTime=await this.page.getByText(processingTime )
//     const serviceProcessingTime = await locateProcessingTime.textContent();
//     console.log("Time is",serviceProcessingTime)
//     await expect(serviceProcessingTime).toStrictEqual(processingTime);
//     const cost= await this.page.getByText(serviceCharge);
//     const serviceCost = await cost.textContent();
//     console.log("Expense is",serviceCost)
//     await expect(serviceCost).toStrictEqual(serviceCharge);
//     const serviceProvision = await this.page.getByText(providedBy,options1);
//     const provider = await serviceProvision.textContent();
//     console.log("Expense is",provider)
//     await expect(provider).toStrictEqual(providedBy,options1);

//  }

//  //Validate the processing time, service charge and the provider
// async clickAppy(role, options2){

//     await this.page.getByRole(role,options2).click();

//  }

//Choose Sector for Biometrics
async selectBiometricSector(sector){

    await this.page.locator('div').filter({ hasText: /^Select Center$/ }).nth(1).click()
    
    await this.page.getByText(sector).click();

 }
 //Choose date for Biometrica
async selectBiometricDate(date){

    await this.page.locator('rect').click()
    await this.page.getByLabel(date).click()
    
 }

 //Choose date for Biometrica
async placeOfCollection(centre,date,district,sector,cell,village){
    // select centre
    await this.page.locator('ng-select').filter({ hasText: 'Select Center' }).locator('span').first().click()
    await this.page.getByText(centre).click()
    //Select date
    await this.page.locator('.form-input-feedback').click()
    await this.page.getByLabel(date).click()
    //select district
    await this.page.locator('ng-select').filter({ hasText: 'Select district' }).locator('span').first().click();
    await this.page.getByText(district).click();
    // Select sector
    await this.page.locator('ng-select').filter({ hasText: 'Select sector' }).locator('span').first().click();
    await this.page.getByText(sector).click();
    // select cell
    await this.page.locator('ng-select').filter({ hasText: 'Select cell' }).locator('span').first().click();
    await this.page.getByText(cell).click();
    //select village
    await this.page.locator('ng-select').filter({ hasText: 'Select village' }).locator('span').first().click();
    await this.page.getByText(village).click();

 }
 // Go to the next page
async goToNextPage(){

    await this.page.getByRole('button', { name: 'Next' }).click()
}

}
