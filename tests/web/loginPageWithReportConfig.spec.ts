import path from 'path';
import { test, expect } from '../../src/fixtures/pageFixtures';
import { CsvHelper } from '../../src/utils/CsvHelper';
import { ExcelHelper } from '../../src/utils/ExcelHelper';
import { JsonHelper } from '../../src/utils/JsonHelper';
import * as allure from "allure-js-commons";
import { log, meta, testData } from 'reporting-labs';


test.beforeEach(async ({ loginPage }) => 
{
    await loginPage.goToLoginPage();
});


test('Login to app - Allure Configuration', async ({ loginPage, homePage }) => 
{
    await allure.suite("Login Tests");
    await allure.severity("Critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid creds", async () => 
    {
        await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
    });

    await allure.step("Verify logout link is visible", async () => 
    {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

    await allure.step("Verify home page title is visible", async () => 
    {
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });
});


test('Login to app - Reporting Labs Configuration', async ({ loginPage, homePage }) => 
{
    meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login', epic: 'US123', story: 'Num123', issue: 'Bug123'});
    
    //Displays the test data in report used in the test
    await testData({ username: process.env.QAUSERNAME!, password: process.env.PASSWORD! }, 'Login'); 

    await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
    let pageTitle = await loginPage.getPageTitle();
    console.log(pageTitle);

    await log('Page Title', pageTitle); // reporting-labs - will print the title in the report

    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    
});


/***************************************************************************************/

// DD_1: read csv data directly from the CSV file and loop the test method row wise
// Pros: light weight, easy to maintain/read, 3rd party lib, no license, flat files, fs, good for large set of test data

//let testCsvData = CsvHelper.readCsv('src/testdata/logindata.csv');

const csvPath = path.join(
    process.cwd(), //cwd - current working directory
    'src',
    'testdata',
    'logindata.csv'
);

const testCsvData = CsvHelper.readCsv(csvPath);

for(let row of testCsvData)
{
    test(`Login to app with invalid credentials with csv - ${row.username}`, async ({ loginPage }) =>
    {
        meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with CSV data', epic: 'US323', story: 'Num123', issue: 'Bug123'})
        await testData(testCsvData, 'Invalid Login Credentials');

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


// DD_2: read excel data directly from the Excel file and loop the test method row wise
// Cons: maintenance & MS Original Licenses

//let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'login');

const excelPath = path.join(
    process.cwd(), //cwd - current working directory
    'src',
    'testdata',
    'logindata.xlsx'
);

const testExcelData = ExcelHelper.readExcel(excelPath, 'login');

for(let row of testExcelData)
{
    test(`Login to app with invalid credentials with excel - ${row.username}`, async ({ loginPage }) =>
    {
        meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with Excel data', epic: 'US311', story: 'Num123', issue: 'Bug123'})
        await testData(testExcelData, 'Invalid Login Credentials');

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


// DD_3: read json data directly from the Json file and loop the test method row wise
// Pros: inbuilt method: parse, lightweight, smaller data source

//let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');

const jsonPath = path.join(
    process.cwd(), //cwd - current working directory
    'src',
    'testdata',
    'logindata.json'
);

const testJsonData = JsonHelper.readJson(jsonPath);

for(let row of testJsonData)
{
    test(`Login to app with invalid credentials with json - ${row.username}`, async ({ loginPage }) =>
    {
        meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with JSON data', epic: 'US911', story: 'Num123', issue: 'Bug123'})
        await testData(testJsonData, 'Invalid Login Credentials');

        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


// To open html report
// npx playwright show-report reports\html-report --port 9324