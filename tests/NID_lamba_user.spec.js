//require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
const { servicesPage} = require('../pages/Select_Service.js');
const { serviceDescription } = require('../pages/Service_Description.js');
const { formDetails } = require('../pages/Form_Details.js');
/*const { personalDetails } = require('../pages/PersonalDetails');
const { payment } = require('../pages/Payment');
const { dispatchDetails } = require('../pages/Confirmation');*/


  test('Application for an NID-Lambda user', async ({ page }) => {
    //Select service
    const service= new servicesPage(page);
    const serviceLocator = "body > app-root > div > app-layout > div > div > div > div > app-home > div > div > div.row.justify-content-start.ng-tns-c239-0 > div > app-allservices > div.services-wrapper.ng-tns-c249-1.ng-star-inserted > div:nth-child(2) > div > div:nth-child(1) > ul > li > p:nth-child(1) > a";
    const validServiceName = ' Application for National ID ';
    const elementLocator ="body > app-root > div > app-layout > div > div > div > div > app-home > div > div > div.row.justify-content-start.ng-tns-c239-0 > div > app-allservices > div.services-wrapper.ng-tns-c249-1.ng-star-inserted > div:nth-child(2) > div > div:nth-child(1) > ul > li > p:nth-child(1) > a"
    await service.openHomePage("English");
    await page.waitForTimeout(2000);
    await service.validateService(serviceLocator,validServiceName);
    await service.selectService(elementLocator);
    await page.waitForTimeout(2000);

    //Descripition page
    const serviceDesc= new serviceDescription(page);
    const dropDown= '[class="ng-arrow-wrapper"]'
    //const label  = 'Options list'
    //const serviceLocatorDes='Application for National ID';
    const processingTime= "Processing Time :  30 Days ";
    const serviceCharge= ' Price : RWF 500 ';
    const providedBy = " NIDA ";
    const options1= { exact: true };
    const role = 'button';
    const options2= { name: 'Apply' };
    const URL ='../application_for_national_id';
    await serviceDesc.selectServiceDesPage(dropDown)//,label,serviceLocatorDes)
    await page.waitForTimeout(2000);
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    await page.waitForTimeout(2000);
    await serviceDesc.clickAppy(role, options2)
    await page.waitForTimeout(5000);

    //Applicatio form:Child ID
    const formElements= new formDetails(page);
    //const titleLocator = 'heading', { name: 'Application for National ID', exact: true }
    const applicantDetails = 'Applicant Details';
    const childIDLocator ='Enter Child Id';
    const titleName = " Application for National ID ";
    const childNameLocator='Enter one of the names';
    const childName= 'Musa'
    const childID='11759946'
    const childYOB='2006'
    const childMOB ='May'
    const childDOB ='May 9,'
    await formElements.validateTitle(titleName)
    await formElements.childDetails(childIDLocator,childID,childName,childYOB,childNameLocator,childDOB,childMOB)
  
    // Application form Biometric Sector
    const district = 'Ngoma'
    const date = 'February 9,'
    const centre = 'BUGESERA-NGERUKA'
    const sector= 'Kazo'
    const cell = 'Karama'
    const village ='Kagusa'
    await formElements.placeOfCollection(centre,date,district,sector,cell,village);
    await formElements.goToNextPage()
    await page.waitForTimeout(5000);

  })//[class="service-preview-title"]