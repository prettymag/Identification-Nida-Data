const robot = require('robotjs');
const { dialog } = require('electron');
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.formDetails=
class formDetails{
    constructor(page){
        this.page=page;
   
    }


//Validate the name of the service
async validateTitle(heading,titleName){

    const locator = await this.page.getByRole(heading, { name: titleName, exact: true });
    console.log("Title locator name", locator )
    const name = await locator.textContent();
    console.log("Title service name", name );
    await expect(name).toStrictEqual(titleName);
    
 }
 async names(locatorName,name){

    await page.getByPlaceholder(locatorName).fill(name);
    
 }
 //Validate block details
 async validateBlockDetails(applicantDetails,indexNumber1){
    const locatorAplicantDetails= await this.page.getByText(applicantDetails).first(indexNumber1);
    console.log("Title locator name applicant details", locatorAplicantDetails )
    const nameAplicantDetails = await locatorAplicantDetails.textContent();
    console.log("Applicant details", nameAplicantDetails);
    await expect(nameAplicantDetails).toStrictEqual(applicantDetails);
    
  }

 //Fill in applicant Details
async applicantIdentityDetails(applicantIDLocator,applicantID,applicantName,applicantYOB,applicantNameLocator,applicantDOB,applicantMOB){
  await this.page.getByPlaceholder(applicantIDLocator).click();
  await this.page.getByPlaceholder(applicantIDLocator).fill(applicantID);
  const verification= await this.page.getByText('remboGov wants to verify that')
  console.log("Verificationt details locator", verification )
  const verificationDetails = await verification.textContent();
  console.log("Applicant details", verificationDetails);
// choose either to use name or date of birth for verification
  if (verificationDetails.includes("names of")) {
    await this.page.getByPlaceholder(applicantNameLocator).fill(applicantName);
    await this.page.waitForTimeout(3000)
    const checkbox=await this.page.$('#mat-checkbox-4 > .mat-checkbox-layout > .mat-checkbox-inner-container');//checkbox]
    console.log('Checkbox locatot', checkbox)
    if(checkbox!=null){
        await checkbox.click()
    }else{
    console.log('No checkbox')
    await this.page.getByRole('button', { name: 'Verify' }).click();//click okay
   }} else {
    
    await this.page.getByRole('textbox', { name: 'Select date' }).click();//click date locator
    await this.page.getByLabel('Choose month and year').click();//choose the month and year
    const getYOB= await this.page.getByLabel(applicantYOB);
    while (!(await getYOB.isVisible())) {
        await this.page.getByLabel('Previous 24 years').click();
        // Add a short delay to allow the page to update
        await this.page.waitForTimeout(500); // Adjust the delay time as needed
    }
    await getYOB.click()
    await this.page.getByLabel(applicantMOB).click();
    await this.page.getByLabel(applicantDOB).click();
    const checkbox=await this.page.$('#mat-checkbox-4 > .mat-checkbox-layout > .mat-checkbox-inner-container');//checkbox]
    console.log('Checkbox locatot', checkbox)
    if(checkbox!=null){
        await checkbox.click()
    }else{
    await this.page.getByRole('button', { name: 'Verify' }).click();
    }
  }
}

async reasonsForApplying(locatorReason,reasonText,roleReason, reason){
    await this.page.locator(locatorReason).filter({ hasText: reasonText, }).getByRole('textbox').click();// click dropdown menu
    //Get reason of DOB
    await this.page.getByRole(roleReason, { name: reason }).click()
    await this. page.click('body')
}

async occupation(occupationLocator ='form',occupationText,occupation){
    await this.page.locator(occupationLocator).filter({ hasText: occupationText}).getByRole('textbox').click();// click dropdown menu
    //Get reason of DOB
    await this.page.getByText(occupation).click();
    await this. page.click('body')
}



async temporaryID(answer1){
    await this.page.getByText('Do you want a temporary')
    await this.page.getByText(answer1).click()

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
async centre(placelocator,placeText,centre){

    //select district
    await this.page.locator(placelocator).filter({ hasText: placeText }).getByRole('textbox').click();
    await this.page.getByText(centre).click();

 }
 //Choose date for Biometrica
async processingDate(){

    await this.page.locator('rect').click()// click the date picker
    const highlightedDate = await this.page.$('button[class="mat-calendar-body-cell mat-calendar-body-active"]');
   
    
  if (highlightedDate) {
    await highlightedDate.click();
    console.log("Clicked on the first non-disabled highlighted date.");
    
  } else {
   // await this.page.pause()
    const nextMonth = await this.page.getByLabel('Next month')
    if (nextMonth) {
        await nextMonth.click();
        console.log("Scrolled to the next month.");
        await this.page.waitForTimeout(10000)

        const handle = await this.page.$('[class="mat-calendar-body-cell mat-calendar-body-active"]');
        console.log('next month highlighted date', handle)
        //await newDate.scrollIntoViewIfNeeded();
        await handle.click({force:true});
        // Recursive call to check for highlighted date in the next month
        //await this.processingDate();
    } else {
        console.log("No more months available to scroll.");
    }
}
}

 //Choose district,sector, cell, village
async place(locate,placeTxt1,place){
    // select centre
    await this.page.locator(locate).filter({ hasText: placeTxt1}).getByRole('textbox').click()
    //await this.page.waitForTimeout(5000);
    await this.page.getByText(place).click()

}
//Choose district,sector, cell, village
async placeIDReplacement(number,district){
    // select centre
    await this.page.getByRole('textbox').first(number).click()
    await this.page.getByText(district).click()

}
async addAttachments(attachmentLocator,attachment){

    
  await this.page.locator(attachmentLocator).getByRole('button').click();

  await this.page.goto(attachment)
  await this.page.pause()
  }



  
  
    
 // Go to the next page
async goToNextPage(){

    await this.page.getByRole('button', { name: 'Next' }).click()
}

}
