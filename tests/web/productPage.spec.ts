import { test, expect } from "../../src/fixtures/pageFixtures";

test.beforeEach(async ({ loginPage }) => 
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
});

test('Verify product header', async ({ homePage, searchResultsPage, productInfoPage}) =>
{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let prodHeader = await productInfoPage.getProductHeader();
    expect (prodHeader).toBe('MacBook Pro');
});

test('Verify product images count', async ({ homePage, searchResultsPage, productInfoPage}) =>
{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let imagesCount = await productInfoPage.getProductImagesCount();
    console.log('Product Images Count: ', imagesCount);
    expect(imagesCount).toBe(4);
});

test('Verify user is able to add product to cart', async ({ homePage, searchResultsPage, productInfoPage, page}) =>
{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.addProductToCart('2');
});


test('Verify product information/data', async({ homePage, searchResultsPage, productInfoPage }) =>
{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let prodMapData = await productInfoPage.getProductInfo();
    console.log(prodMapData);

    expect.soft(prodMapData.get('Page header')).toBe('MacBook Pro');
    expect.soft(prodMapData.get('Images count')).toBe(4);

    expect.soft(prodMapData.get('Brand')).toBe('Apple');
    expect.soft(prodMapData.get('Product Code')).toBe('Product 18');
    expect.soft(prodMapData.get('Reward Points')).toBe('800');
    expect.soft(prodMapData.get('Availability')).toBe('Out Of Stock');

    expect.soft(prodMapData.get('prodPrice')).toBe('$2,000.00');
    expect.soft(prodMapData.get('prodExTaxPrice')).toBe('$2,000.00');
    
});