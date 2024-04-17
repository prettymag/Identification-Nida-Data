const { test, expect } = require('@playwright/test');// impost test and expect from the @playwright/test modeule 
exports.detailsSummary=
class detailsSummary{
    constructor(page){
        this.page=page;
    
    }


//Validate the name of the service
async validateSummaryTitle(summaryTitle){

    const locatorSummary = await this.page.getByRole('heading', { name: 'Summary Details' });
    console.log("locatorSummary", locatorSummary )
    const summary = await locatorSummary.textContent();
    console.log("Title service name", summary );
    await expect(summary).toStrictEqual(summaryTitle);
    
 }
 //Validate applicant details summary
 async summaryApplicantDetails(applicantNamelocator,applicantName, applicantID,nationality,number=0){
    //Validate name
    const locatorSummaryName= await this.page.getByText(applicantNamelocator);
    console.log("ocatorSummaryName", locatorSummaryName)
    const summaryName = await locatorSummaryName.textContent();
    console.log("summaryName", summaryName);
    await expect(summaryName).toContain(applicantName);

    //Validate the applicant id 
    const locatorSummaryID= await this.page.getByText(applicantID,{ exact: true });
    console.log("locatorSummaryID", locatorSummaryID )
    const summaryID = await locatorSummaryID.textContent();
    console.log("summaryID", summaryID);
    await expect(summaryID).toContain(applicantID);

    //Validate nationality
    const locatorSummaryNationality= await this.page.getByText(nationality,{ exact: true }).first(number);
    console.log("locatorSummaryNationality", locatorSummaryNationality)
    const summaryNationality = await locatorSummaryNationality.textContent();
    console.log("summaryNationality", summaryNationality);
    await expect(summaryNationality).toContain(nationality);
    
  }
  //Validate the Biometric Capture Details
 async summaryProcessingCentre(centre,centreLocator){
    //Validate name
    const locatorSummaryCentre= await this.page.getByText(centreLocator);
    console.log("ocatorSummaryName", locatorSummaryCentre )
    const summaryCentre = await locatorSummaryCentre.textContent();
    console.log("summaryCentre", summaryCentre);
    await expect(summaryCentre).toContain(centre);

 }

 async summaryDate(dateLocator){

    //Validate the date of taking biometric data
    const locatorSummaryDate= await this.page.getByText(dateLocator);
    console.log("locator Summary Date", locatorSummaryDate )
    const summaryDate = await locatorSummaryDate.textContent();
    console.log("summary Date", summaryDate)
    await expect(summaryDate).toContain(dateLocator);

  }

  //Validate the Collection Centre
 async summaryCollectionCentre(district,districtLocator,sector,sectorLocator,cell,cellLocator,village,villageLocator){
    //Validate the district
    const locatorSummaryDistrict= await this.page.getByText(districtLocator);
    console.log("locatorSummaryDistrict", locatorSummaryDistrict )
    const summaryDistrict = await locatorSummaryDistrict.textContent();
    console.log("summaryDistrict", summaryDistrict);
    await expect(summaryDistrict).toContain(district);

    //Validate the sector
    const locatorSummarySector= await this.page.getByText(sectorLocator);
    console.log("locatorSummarySector", locatorSummarySector )
    const summarySector = await locatorSummarySector.textContent();
    console.log("summary district", summarySector)
    await expect(summarySector).toContain(sector);

    //Validate the cell
    const locatorSummaryCell= await this.page.getByText(cellLocator);
    console.log("locatorSummaryCell", locatorSummaryCell )
    const summaryCell = await locatorSummaryCell.textContent();
    console.log("locatorSummaryCell", summaryCell)
    await expect(summaryCell).toContain(cell);

    //Validate the village
    const locatorSummaryVillage= await this.page.getByText(villageLocator);
    console.log("locatorSummaryVillage", locatorSummaryVillage )
    const summaryVillage = await locatorSummaryVillage.textContent();
    console.log("locatorSummaryVillage", summaryVillage)
    await expect(summaryVillage).toContain(village);
  }

//Tick and fill in contact  details
async contactDetails(phone,email){

const checkboxLocators = ['.mat-checkbox-inner-container', '#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container'];


    for (const locator of checkboxLocators) {
        // Check if the checkbox is checked
        const isChecked = await this.page.isChecked(locator);
        if (!isChecked) {
            // If not checked, click on the checkbox to toggle its state
            await this.page.click(locator);
            console.log('Locator', locator)
        }
    }

    await this.page.getByPlaceholder('Enter phone number').fill(phone);
    await this.page.getByPlaceholder('Enter an email address').fill(email);
    await this.page.locator('#mat-checkbox-1 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();//consent
    await this.page.getByRole('button', { name: 'Submit' }).click()//submit
    

 }
 

 
}