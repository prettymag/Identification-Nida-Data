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
    const elementLocator = '  Certificate of Full Identity ';
    const validName = " Certificate of Full Identity ";
    const number= 0
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);

    //Descripition page validation
    const serviceDesc= new serviceDescription(page);
    //const dropDown= '[class="ng-arrow-wrapper"]'
    const processingTime= "Processing Time :  1 Day ";
    const serviceCharge= ' Price : RWF 500 ';
    const providedBy = " MINALOC ";
    const options1= { exact: false };
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
   
    //choose user
    const attachment = 'Passport Photo'
    const user = 'Child'
    await serviceDesc.chooseUser(user,attachment)

    // Click apply
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.clickAppy(role, roleName)
   
    // // //Application formX
    const formElements= new formDetails(page);
    const titleName = " Certificate of Full Identity ";
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)

    // // Processing district
    
    const occupationText = 'Select occupation'
    const occupation= 'Commercial'
    const occupationLocator ='ng-select'
    await formElements.occupation(occupationLocator,occupationText,occupation)
   
    //Applicant Details
    const applicantDetails = 'Applicant Details';
    const applicantIDLocator ='Enter Child Id';
    const applicantNameLocator='Enter one of the names';
    const applicantName= 'MUSA'
    const applicantID='11759946'
    const applicantYOB='2006'
    const applicantMOB ='May'
    const applicantDOB ='May 9,'
    await formElements.applicantIdentityDetails(applicantIDLocator,applicantID,applicantName,applicantYOB,applicantNameLocator,applicantDOB,applicantMOB)
  
    // // Processing district
    const locator= 'ng-select'
  
    const districtText ='Select district'
    const district = 'Bugesera'
    await formElements.place(locator,districtText,district)

    // Processing sector

    const sectorText ='Select sector'
    const sector = 'Juru'
    await formElements.place(locator,sectorText,sector);
    
      
    // // Reasons for aplying
    const roleReason= 'option'
    const reason= 'Work'
    const locatorReason = 'ng-select'
    const reasonText  = 'Select the reason your\'re'
    await formElements.reasonsForApplying(locatorReason,reasonText,roleReason, reason)

    // Add attachment 
    const attachmentLocator = 'app-attachments'
    const fileAttachment = 'file:/C:/Users/prettymoremagede/Desktop/Screenshot 2024-03-19 at 10.08.03.png'
    await formElements.addAttachments(attachmentLocator,fileAttachment)
    
    
  })