require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
const { servicesPage} = require('../pages/Select_Service.js');
const { serviceDescription } = require('../pages/Service_Description.js');
const { formDetails } = require('../pages/Form_Details.js');
const { detailsSummary } = require('../pages/Summary_Page.js');
const { paymentPage } = require('../pages/Payment_Page.js');
const { alertHandler } = require('../pages/Alert_Handler.js')


  test('Application for Certificate of Nationality(self)', async ({ page }) => {
    //login variables
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    // handle any alerts
    const alerts = new alertHandler(page)
    await alerts.handleAlerts()
    //Open homepage in English and login
    const service= new servicesPage(page);
    await service.openHomePage("English");
    await service.login(username,password)
   
    //Validate name of service and select it
    const elementLocator = '  Certificate of Nationality ';
    const validName = " Certificate of Nationality ";
    const number= 0
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
   
    //Descripition page validation
    const serviceDesc= new serviceDescription(page);
    const dropDown= '[class="ng-arrow-wrapper"]'
    const processingTime= "Processing Time :  1 Day ";
    const serviceCharge= ' Price : RWF 1,500 ';
    const providedBy = " MINALOC ";
    const options1= { exact: false };
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    await serviceDesc.clickAppy(role, roleName)
   
    // //Application form
    const formElements= new formDetails(page);
    const titleName = " Certificate of Nationality ";
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)
   
    // Processing district
    const district = 'Bugesera'
    const placelocator= 'app-location'
    const placeText =  'Select district' 
    await formElements.place(placelocator,placeText,district)

    // Processing sector
    const locator= 'ng-select'
  
    const sectorText1 ='Select sector'
    const sector2 = 'Juru'
    await formElements.place(locator,sectorText1,sector2)

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

    // //Validate the Place of Collection
    
    const centreLocator = 'District : Bugesera'
    const sectorLocator = 'Sector : Juru'
    const centre = 'Bugesera'
    const sector ='Juru'
    await summaryDetails.summaryProcessingCentre(centre,centreLocator)
    await summaryDetails.summaryProcessingCentre(sector,sectorLocator)
    
    //Validate contact details
    const phone = '0782333574'
    const email = 'p.magede@irembo.com'
    await summaryDetails.contactDetails(phone,email)
   
    //Payment details and next steps
    const paymentDetails = new paymentPage(page)
    ////Step1
    const step1Locator= 'Payment'//, { exact: true })
    const step1= 'Payment'
    await paymentDetails.validateNextSteps(step1Locator,step1,true)

    ////Step2
    const step2Locator='When should you expect the'
    const step2= "When should you expect the certificate"
    await paymentDetails.validateNextSteps(step2Locator,step2)
     
    //// Validate pricing and bill ID
    const billingID = 'Bill ID'
    const cost = "RWF 1,500"
    await paymentDetails.validatePaymentDetails(cost,billingID)

    ////Make payment
    const price= 'Pay 1500'
    const payButton= 'button'
    const momoPhone = '0781234567'
    await paymentDetails.paymentDetails(momoPhone,payButton,price)
   
  })