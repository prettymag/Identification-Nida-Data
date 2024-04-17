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
    
    //Login and select service
    const service= new servicesPage(page);
    const elementLocator = 'National ID Replacement';
    const validName = ' National ID Replacement ';
    const number= 0
    await service.openHomePage("English");
    await service.login(username,password)
    await service.validateService(elementLocator,number,validName);
    await service.selectService(elementLocator);
   

    

    //Description page
    const serviceDesc= new serviceDescription(page);
    const processingTime= "Processing Time :  30 Days ";
    const serviceCharge= ' Price : RWF 1,500 ';
    const providedBy = " NIDA ";
    const options1= { exact: true };
    const role = 'button';
    const roleName= 'Apply';
    await serviceDesc.validateServiceDesciption(processingTime,serviceCharge,providedBy,options1)
    
    await serviceDesc.clickAppy(role, roleName)
    //await page.waitForTimeout(5000);

    //Application form:applicant ID
    const formElements= new formDetails(page);
    //Validate the title on the page
    const titleName = " National ID Replacement ";
    const heading = 'heading'
    await formElements.validateTitle(heading,titleName)

    //Validate the block details
    const applicantDetails = " Application Details ";
    const indexNumber1 =0
    await formElements.validateBlockDetails(applicantDetails,indexNumber1)

    

    // Temporary ID
    const answer1= 'Yes'
    await formElements.temporaryID(answer1)


    //Temporary ID Processing Office:District
    
    //const locator2= ''
    const district2 = 'Burera'
    
    await formElements.placeIDReplacement(number,district2)
  

     //Temporary ID Processing Office:Sector
    const locator= 'ng-select'
  
    const sectorText1 ='Select sector'
    const sector2 = 'Butaro'
    await formElements.place(locator,sectorText1,sector2)
    
    
    //RIB Processing  office
    ////Select RIB District
    const districtText = 'RIB Processing Office *Select'
    const districtLocatorRole = 'app-location'
    const district = 'Ngoma'
    //const number3= 0
    
    await formElements.place(districtLocatorRole,districtText,district)

    ////Select RIB sector
    
    let collectionSector= 'Kibungo'
    const collectionSectorText= /^Select sector$/
    await formElements.place(locator,collectionSectorText,collectionSector)
    


    //Permanent ID Collection Centre
    ////Select Collection District
    const districtCollectionText = 'Place of Collection *Select' 
    const district3 = 'Gasabo'
    await formElements.place(districtLocatorRole,districtCollectionText,district3)
    

    //Select Collection sector
    
    collectionSector= 'Gisozi'
    
    await formElements.place(locator,collectionSectorText,collectionSector)
    

    //Select cell
    const cell = 'Ruhango'
    const cellText = 'Select cell' 
    await formElements.place(locator,cellText,cell)
   

    //Select village
    const village ='Ntora'
    const villageText = 'Select village'
    await formElements.place(locator,villageText,village)
   
    //Go to the next page
    await formElements.goToNextPage()
  
    //Summary Details
    const  summaryDetails = new detailsSummary(page)
    ////Validate title
    const summaryTitle = 'Summary Details'
    await summaryDetails.validateSummaryTitle(summaryTitle)
    
    ////Validate the details
    const nationality = 'Rwanda'
    const applicantNamelocator= 'Other Names : Alleluya Middle'
    const applicantName= 'Alleluya Middle Name Iradukunda'
    const applicantID='1199070012894287'
    await summaryDetails.summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality)
   
    ////Validating collection centre
    const districtLocator = 'District : Ngoma'
    const sectorLocator = 'Sector: Kibungo'
    const cellLocator= 'Cell: Ruhango'
    const villageLocator= 'Village: Ntora'
    const sector= 'Kibungo'
    await summaryDetails.summaryCollectionCentre(district,districtLocator,sector,sectorLocator,cell,cellLocator,village,villageLocator)
    
    ////Validate processing district
    const processingOfficeLocator= 'District: Ngoma'
    const processingOffice = 'Ngoma'
    await summaryDetails.summaryProcessingCentre(processingOffice,processingOfficeLocator);
   
    // validating contact details
    const phone = '0782333574'
    const email = 'p.magede@irembo.com'
    await summaryDetails.contactDetails(phone,email)
   
    //Payment details
    const paymentDetails = new paymentPage(page)

    // Validate next steps
    /////Step1
    const step1Locator= 'Going for the RIB appointment'
    const step1= 'Going for the RIB appointment'
    await paymentDetails.validateNextSteps(step1Locator,step1)

    ////Step 2
    const step2Locator='Payment and getting your Id'
    const step2= "Payment and getting your Id card"
    await paymentDetails.validateNextSteps(step2Locator,step2)
   
    ////Application number
    const applicationNumber= 'Application No' 
    await paymentDetails.validateApplicationNumber(applicationNumber)
   
  })