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
    const ampEyes = process.env.APPLITOOLS_API_KEYS;
    // handle any alerts
    const alerts = new alertHandler(page)
    await alerts.handleAlerts()
    //Open homepage in English and login
    const service= new servicesPage(page);
    await service.openHomePage("English");
    await service.login(username,password)
    
    
    
    //Validate name of service and select it

    const elementLocator = '  Certificate of Being Alive ';
    const validName = " Certificate of Being Alive ";
    const number= 0
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
   
    //Descripition page validation
    const serviceDesc= new serviceDescription(page);
    const dropDown= '[class="ng-arrow-wrapper"]'
    const processingTime= "Processing Time :  1 Day ";
    const serviceCharge= ' Price: Free ';
    const providedBy = " MINALOC ";
    const options1= { exact: false };
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    await serviceDesc.clickAppy(role, roleName)
     
    // // //Application form
    const formElements= new formDetails(page);
    const titleName = " Certificate of Being Alive ";
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)
    
    // // Processing district
    const locator= 'ng-select'
  
    const districtText ='Select district'
    const district = 'Bugesera'
    await formElements.place(locator,districtText,district)

    // Processing sector

    const sectorText ='Select sector'
    const sector = 'Juru'
    await formElements.place(locator,sectorText,sector);

    // Reasons for aplying
    const roleReason= 'option'
    const reason= 'Work'
    const locatorReason = 'ng-select'
    const reasonText  = 'Select the reason your\'re' 
    
    await formElements.reasonsForApplying(locatorReason,reasonText,roleReason, reason)
    
    await formElements.goToNextPage()
    
    //Summary Details
    const  summaryDetails = new detailsSummary(page)
    
    //Validate Page Title
    const summaryTitle = 'Summary Details'
    await summaryDetails.validateSummaryTitle(summaryTitle)
   
    //Validate Applicant Details
    const nationality = 'Rwanda'
    const applicantNamelocator= 'Other Names : Alleluya Middle'
    const applicantName ='Alleluya Middle'
    const applicantID = '1199070012894287'
    await summaryDetails.summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality,)
    
    //Validate contact details
    const phone = '0782333574'
    const email = 'testirembo@gmail.com'
    await summaryDetails.contactDetails(phone,email)
    await page.pause() 
   
  })