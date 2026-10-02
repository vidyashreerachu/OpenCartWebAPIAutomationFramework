import path from 'path';
import { test, expect } from "../../src/fixtures/pageFixtures";
import { CsvHelper } from '../../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => 
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
});

test('Verify search results count', async ({ homePage, page, searchResultsPage }) => 
{
    await homePage.doSearch('macbook');
    expect (await page.title()).toContain('macbook');
    let prodCount = await searchResultsPage.getSearchResultsCount();
    console.log('Search results count: ', prodCount);
    expect(prodCount).toBe(3);
});

test('Verify user is able to land on the product page', async ({ homePage, searchResultsPage, page }) =>
{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect (await page.title()).toBe('MacBook Pro');
});


const csvPath = path.join(
    process.cwd(),
    'src',
    'testdata',
    'productdata.csv'
);

let testData = CsvHelper.readCsv(csvPath);
for(let row of testData)
{
    test(`Verify user is able to land on the product page - ${row.productName} `, async ({ homePage, searchResultsPage, page }) =>
    {
        await homePage.doSearch(row.searchKey);
        let prodCount = await searchResultsPage.getSearchResultsCount();
        expect(prodCount).toBe(Number(row.resultsCount)); // convert string to number
        await searchResultsPage.selectProduct(row.productName);
        expect (await page.title()).toBe(row.productName);
    });
}