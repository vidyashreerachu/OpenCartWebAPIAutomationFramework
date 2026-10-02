import path from 'path';
import { test, expect } from '../../src/fixtures/pageFixtures';
import { CsvHelper } from '../../src/utils/CsvHelper';
import { ExcelHelper } from '../../src/utils/ExcelHelper';
import { JsonHelper } from '../../src/utils/JsonHelper';


test.beforeEach(async ({ loginPage }) => 
{
    await loginPage.goToLoginPage();
});

test('Login page title test', async ({ loginPage }) => 
{
    let pageTitle = await loginPage.getPageTitle();
    console.log(pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('Forgot password link exist', async ({ loginPage }) =>
{
    expect (await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test('User is able to login to app', async ({ loginPage, homePage }) => 
{
    await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});

// In Powershell: $env:ENV="stage"; npx playwright test ./tests/web/loginPageFix.spec.ts
// In CMD: set ENV=stage && npx playwright test ./tests/web/loginPageFix.spec.ts

test('Verify login page headers', async ({ loginPage }) =>
{
    let headers = await loginPage.getLoginPageHeaders();
    console.log('Page headers: ', headers);
    expect.soft(headers).toHaveLength(2);
    expect.soft(headers).toEqual([
        'New Customer', 
        'Returning Customer'
    ]);
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
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
}


// DD_4: using test data from fixtures
// not recommended
// if test data is mentioned in fixtures it will be executed in sequential mode, so please avoid

test(`Login to app with invalid credentials with data from fixtures`, async ({ loginPage, testData }) =>
{
    for(let row of testData)
    {
    await loginPage.doLogin(row.username, row.password);
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});


//common features test
test('App logo exists on Login Page', async ({ basePage }) => 
{
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Search box exists on Login Page', async ({ basePage }) => 
{
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Footer links count on Login Page', async ({ basePage }) => 
{
    expect(await basePage.getPageFootersCount()).toBe(16);
});

test('Cart button exists on Login Page', async ({ basePage }) =>
{
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

