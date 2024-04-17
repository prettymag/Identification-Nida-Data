const { Eyes, Target } = require('@applitools/eyes-playwright');
require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
const { servicesPage} = require('../pages/Select_Service.js');
const { serviceDescription } = require('../pages/Service_Description.js');
const { formDetails } = require('../pages/Form_Details.js');
const { detailsSummary } = require('../pages/Summary_Page.js');
const { paymentPage } = require('../pages/Payment_Page.js');
const { alertHandler } = require('../pages/Alert_Handler.js');
const { emailPage } = require('../pages/Email.js');

test('Application for Certificate of Nationality(self)', async ({ page }) => {
    //login variables
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const apiKey = process.env.APPLITOOLS_API_KEYS;
    // handle any alerts
    const alerts = new alertHandler(page)
    await alerts.handleAlerts()
    //Open homepage in English and login
    const service= new servicesPage(page);
    await service.openHomePage("English");
   // await service.login(username,password)
    
    
    //Validate name of service and select it

    const elementLocator = '  Registration in the National ';
    const validName = " Registration in the National Population Registry ";
    const number= 0
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
   
    
   

    //Descripition page validation
    const serviceDesc= new serviceDescription(page);
    const processingTime= "Processing Time :  1 Day ";
    const serviceCharge= " Price: Free ";
    const providedBy = " NIDA ";
    const options1= { exact: true };
    const role = 'button';
    const roleName= 'Apply';
    //await serviceDesc.selectServiceDesPage(dropDown)//,label,serviceLocatorDes)
   
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    
    await serviceDesc.clickAppy(role, roleName)
   



    // // //Application formX
    const formElements= new formDetails(page);
   
    const titleName = " Registration in the National Population Registry ";
    
     const heading = 'heading'
     await formElements.validateTitle(heading,titleName)
    // await formElements.applicantIdentityDetails(applicantIDLocator,applicantID,applicantName,applicantYOB,applicantNameLocator,applicantDOB,applicantMOB)
    

    // Enter names
    const surname = Mamama
    const otherNames = Meme
    const locatorSurname = 'Surname'
    const locatorOtherNames = 'Enter Other names'
    const fathersName = Mugwaze
    await formElements.names(locatorSurname,surname)
    await formElements.names(locatorOtherNames,otherNames)

    await formElements.processingDate()
    await page.pause()
    // // // Sellect Occupation
    // const occupationText = 'Select occupation' 
    // const occupation= 'Commercial'
    // const occupationLocator = 'ng-select'
    // // const placeText =  'Select district' 
    // await formElements.occupation(occupationLocator,occupationText,occupation)
    

    // // // Processing district
    // const locator= 'ng-select'
  
    // const districtText ='Select district'
    // const district = 'Bugesera'
    // await formElements.place(locator,districtText,district)

    // // Processing sector

    // const sectorText ='Select sector'
    // const sector = 'Juru'
    // await formElements.place(locator,sectorText,sector);
      
    // // // Reasons for aplying
    // const roleReason= 'option'
    // const reason= 'Work'
    // const locatorReason = 'ng-select'
    // const reasonText  = 'Select the reason your\'re'
   
    // await formElements.reasonsForApplying(locatorReason,reasonText,roleReason, reason)
    
    // await formElements.goToNextPage()
   
     

    // //Summary Details
    // const  summaryDetails = new detailsSummary(page)
    
    // // //Validate Page Title
    // // const summaryTitle = 'Summary Details'
    // // await summaryDetails.validateSummaryTitle(summaryTitle)
   
    // // //Validate Applicant Details
    // // const nationality = 'Rwanda'
    // // const applicantNamelocator= 'Other Names : Alleluya Middle'
    // // const applicantName ='Alleluya Middle'
    // // const applicantID = '1199070012894287'
    // // await summaryDetails.summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality,)
    
   
   

    // //Validate contact details
    // const phone = '0782333574'
    // const email = 'testirembo@gmail.com'
    // await summaryDetails.contactDetails(phone,email)
    // //await page.pause() 
   

    // //Payment details and next steps
    // const paymentDetails = new paymentPage(page)
    // ////Step1
    // const step1Locator= 'Payment'//, { exact: true })
    // const step1= 'Payment'
    // await paymentDetails.validateNextSteps(step1Locator,step1,true)

    // ////Step2
    // const step2Locator='When should you expect the'
    // const step2= "When should you expect the certificate"
    // await paymentDetails.validateNextSteps(step2Locator,step2)
     
    // //// Validate pricing and bill ID
    // const billingID = 'Bill ID'
    // const cost = "RWF 500"
    // await paymentDetails.validatePaymentDetails(cost,billingID)

    // ////Make payment
    // const price= 'Pay 500'
    // const payButton= 'button'
    
    
    // await paymentDetails.payByCard(payButton,price)

    // //Open email
    // const emailReceived= new emailPage(page)
    // const username1 =process.env.EMAIL;
    // const password1= process.env.EMAIL_PASSWORD;
    // const url = 'https://dashboard.sandbox.irembopay.com/assets/payment/src/pop-up.html'
    // const subject= 'Certificate of Full Identity - Status of B240322153921A6EP - Successful payment'
    // await emailReceived.login(username1,password1)
    
    // await emailReceived.closePageWithURL(url)
    // await emailReceived.openEmail(subject)//open submitted email
    
    



    // // Set up Applitools Eyes
    // const eyes = new Eyes();
    // await eyes.setApiKey(apiKey);
    // await eyes.runTest()

  })