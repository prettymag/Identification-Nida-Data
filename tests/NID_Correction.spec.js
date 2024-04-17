require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
const { servicesPage} = require('../pages/Select_Service.js');
const { serviceDescription } = require('../pages/Service_Description.js');
const { formDetails } = require('../pages/Form_Details.js');
const { detailsSummary } = require('../pages/Summary_Page.js');
const { paymentPage } = require('../pages/Payment_Page.js');
const { alertHandler } = require('../pages/Alert_Handler.js')



  test('Application for NID Correction', async ({ page }) => {

    //login variables
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    // handle any alerts
    const alerts = new alertHandler(page)
    await alerts.handleAlerts()
    //Select service
    const service= new servicesPage(page);
    const elementLocator = ' Application for National ID Correction ';
    const validName = ' Application for National ID Correction ';
    const number= 0
    await service.openHomePage("English");
    
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
    await page.waitForTimeout(2000);

    

    //Descripition page
    const serviceDesc= new serviceDescription(page);
    const processingTime= "Processing Time :  30 Days ";
    const serviceCharge= ' Price : RWF 1,500 ';
    const providedBy = " NIDA ";
    const options1= { exact: true };
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    await page.waitForTimeout(2000);
    await serviceDesc.clickAppy(role, roleName)
    //await page.waitForTimeout(5000);

    //Applicatio form:applicant ID
    const formElements= new formDetails(page);
    //Validate the title on the page
    const titleName = " Application for National ID Correction ";
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)

    //Validate the block details
    const applicantDetails = " Reason For ID Correction ";
    const indexNumber1 =0
    await formElements.validateBlockDetails(applicantDetails,indexNumber1)

    //Fill in the applicant details
    const applicantIDLocator ='Enter national ID number';
    const applicantNameLocator='Enter one of the names';
    const applicantName= 'Charles'
    const applicantID='1191980000839204'
    const applicantYOB='1919'
    const applicantMOB ='May'
    const applicantDOB = 'May 5'
    await formElements.applicantIdentityDetails(applicantIDLocator,applicantID,applicantName,applicantYOB,applicantNameLocator,applicantDOB,applicantMOB)

    // Reasons for aplying
    const roleReason= 'option'
    const reason= 'Date of Birth'
    const locatorReason = 'ng-select'
    const reasonText  = 'Reason For ID Correction' 
    await formElements.reasonsForApplying(locatorReason,reasonText,roleReason, reason)
    
    //Input Place of Collection details
    const sector= 'Kazo'
    const sectorText = 'Select sector'
    const cell = 'Karama'
    const cellText = 'Select cell' 
    const village ='Kagusa'
    const villageText = 'Select village'
    const districtText = 'Place of Collection *Select'
    const districtLocatorRole = 'form'
    const district = 'Ngoma'
    const locator= 'ng-select'
    await formElements.place(districtLocatorRole,districtText,district)
    await formElements.place(locator,sectorText,sector)
    await formElements.place(locator,cellText,cell)
    await formElements.place(locator,villageText,village)

    //Processing Office
    
    const locator2= 'app-collection-info'
    const district2 = 'Huye'
    const sector2 = 'Kinazi'
    const collectionDistrict= 'Select district'
    const sectorText1 =  /^Select sector$/
    await formElements.place(locator2,collectionDistrict,district2)
   
    //await page.waitForTimeout(7000);
    await formElements.place(locator,sectorText1,sector2)
    await page.waitForTimeout(1000);

    //Go to the next page
    await formElements.goToNextPage()
    await page.waitForTimeout(5000)
   
    //Summary Details
    const  summaryDetails = new detailsSummary(page)
    ////Validate title
    const summaryTitle = 'Summary Details'
    await summaryDetails.validateSummaryTitle(summaryTitle)
    
    ////Validate the details
    const nationality = 'Rwanda'
    const applicantNamelocator= 'Other Names : Alleluya Middle'
    await summaryDetails.summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality)
   
    ////Validating collection centre
    const districtLocator = 'District : Ngoma'
    const sectorLocator = 'Sector : Kazo'
    const cellLocator= 'Cell : Karama'
    const villageLocator= 'Village : Kagusa'
    await summaryDetails.summaryCollectionCentre(district,districtLocator,sector,sectorLocator,cell,cellLocator,village,villageLocator)
    
    ////Validate processing district
    const processingOfficeLocator= 'District : Huye'
    const processingOffice = 'Huye'
    await summaryDetails.summaryProcessingCentre(processingOffice,processingOfficeLocator);

    ////Validate processing district
    const processingSectorLocator= 'Sector : Kinazi'
    const processingSector = 'Kinazi'
    await summaryDetails.summaryProcessingCentre(processingSector,processingSectorLocator);

    //// validating contact details
    const phone = '0782333574'
    const email = 'p.magede@irembo.com'
    await page.waitForTimeout(2000);
    await summaryDetails.contactDetails(phone,email)
    await page.waitForTimeout(2000);

    //Payment details
    const paymentDetails = new paymentPage(page)

    // Validate next steps
    /////Step1
    const step1Locator= 'Payment'//{ exact: true })
    const step1= 'Payment'
   
    await paymentDetails.validateNextSteps(step1Locator,step1,true)

    ////Step 2
    const step2Locator='Going for the sector'
    const step2= "Going for the sector appointment and getting your Id card"
    await paymentDetails.validateNextSteps(step2Locator,step2)

    ////Service Charge
    const billingID = 'Bill ID'
    const cost = "RWF 1,500"
    await paymentDetails.validatePaymentDetails(cost,billingID)
    
    ////Mobile money payment
    const payButton= 'button'
    const momoPhone = '0781234567'
    const price= 'Pay 1500'
    await paymentDetails.paymentDetails(momoPhone,payButton,price)
    await page.waitForTimeout(2000);

  })