require('dotenv').config();
const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
const { servicesPage} = require('../pages/Select_Service.js');
const { serviceDescription } = require('../pages/Service_Description.js');
const { formDetails } = require('../pages/Form_Details.js');
const { detailsSummary } = require('../pages/Summary_Page.js');
const { paymentPage } = require('../pages/Payment_Page.js');
const { alertHandler } = require('../pages/Alert_Handler.js')


  test('Application for an NID-Sprcial Case', async ({ page }) => {
    //login variables
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    // handle any alerts
    const alerts = new alertHandler(page)
    await alerts.handleAlerts()
    //Open homepage inEnglish
    const service= new servicesPage(page);
    await service.openHomePage("English");

    //Validate name of service and select it
   
    const elementLocator = '  Application for National ID  ';
    const validName = " Application for National ID ";
    const number= 0
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
    

    //Descripition page validation
    const serviceDesc= new serviceDescription(page);
    const serviceName= 'Application For National NID (Special Case)'
    const processingTime= "Processing Time :  1 Day ";
    const serviceCharge= ' Price : RWF 500 ';
    const providedBy = " NIDA ";
    const options1= { exact: true };
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.selectServiceOnDesPage(serviceName)//,label,serviceLocatorDes)
   
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    
    await serviceDesc.clickAppy(role, roleName)
   

    //Application formX
    const formElements= new formDetails(page);
    //Applicant Details
    const applicantDetails = 'Applicant Details';
    const applicantIDLocator ='Enter Child Id';
    const titleName = " Application For National NID (Special Case) ";
    const applicantNameLocator='Enter one of the names';
    const applicantName= 'MUSA'
    const applicantID='11759946'
    const applicantYOB='2006'
    const applicantMOB ='May'
    const applicantDOB ='May 9,'
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)
    await formElements.applicantIdentityDetails(applicantIDLocator,applicantID,applicantName,applicantYOB,applicantNameLocator,applicantDOB,applicantMOB)
    await page.pause()
    // // Application place of collection
    // const district = 'Ngoma'
    // const centre = 'BUGESERA-NGERUKA'
    // const placelocator= 'ng-select'
    // const placeText =  'Select Center' 
    // await formElements.centre(placelocator,placeText,centre)
   

    // //Get the date
    // //const date = 'February 23,'
    // await formElements.processingDate()
  

    // // Place of collection
    // const sector= 'Kazo'
    // const sectorText = 'Select sector'
    // const cell = 'Karama'
    // const cellText = 'Select cell' 
    // const village ='Kagusa'
    // const villageText = 'Select village'
    // const districtText = 'Place of Collection *Select'
    // const districtLocatorRole = 'form'
    // const locator= 'ng-select'
    // await formElements.place(districtLocatorRole,districtText,district)
    // await formElements.place(locator,sectorText,sector)
    // await formElements.place(locator,cellText,cell)
    // await formElements.place(locator,villageText,village)
    

    

    // await formElements.goToNextPage()
    

    // //Summary Details
    // const  summaryDetails = new detailsSummary(page)
    
    // //Validate Page Title
    // const summaryTitle = 'Summary Details'
    // await summaryDetails.validateSummaryTitle(summaryTitle)
   
    // //Validate Applicant Details
    // const nationality = 'Rwanda'
    // const applicantNamelocator= 'Full name: MUSA Moses'
    // await summaryDetails.summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality)

    // //Validate the Place of Collection
    
    // const districtLocator = 'District : Ngoma'
    // const sectorLocator = 'Sector : Kazo'
    // const cellLocator= 'Cell : Karama'
    // const villageLocator= 'Village : Kagusa'
    // const centreLocator= 'Center : BUGESERA-NGERUKA'
    // const dateLocator= 'Date : 16/2/'
    // await summaryDetails.summaryCollectionCentre(district,districtLocator,sector,sectorLocator,cell,cellLocator,village,villageLocator)
    
    // //Validate Processing Centre
    // await summaryDetails.summaryProcessingCentre(centre,centreLocator,date,dateLocator);
    
    

    // //Validate contact details
    // const phone = '0782333574'
    // const email = 'p.magede@irembo.com'
    // await summaryDetails.contactDetails(phone,email)
   

    // //Payment details and next steps
    // const paymentDetails = new paymentPage(page)
    // ////Step1
    // const step1Locator= 'Payment'//, { exact: true })
    // const step1= 'Payment'
    // await paymentDetails.validateNextSteps(step1Locator,step1,true)

    // ////Step2
    // const step2Locator='Going for BDC capture and'
    // const step2= "Going for BDC capture and getting your ID card"
    // await paymentDetails.validateNextSteps(step2Locator,step2)
     
    // //// Validate pricing and bill ID
    // const billingID = 'Bill ID'
    // const cost = "RWF 500"
    // await paymentDetails.validatePaymentDetails(cost,billingID)

    // ////Make payment
    // const price= 'Pay 500'
    // const payButton= 'button'
    // const momoPhone = '0781234567'
    
    // await paymentDetails.paymentDetails(momoPhone,payButton,price)
    
    

  })