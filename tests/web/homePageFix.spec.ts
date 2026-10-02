import { test, expect } from '../../src/fixtures/pageFixtures';

test.beforeEach(async ({ loginPage }) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.QAUSERNAME!, process.env.PASSWORD!);
});

test('Home page title test', async ({ homePage }) =>
{
    let title = await homePage.getHomePageTitle();
    console.log('Home page title: ', title);
    expect (title).toBe('My Account');
});

test('Logout link exist test', async ({ homePage }) =>
{
    expect (homePage.isLogoutLinkExist).toBeTruthy();
});

test('Home page headers exist test', async ({ homePage }) =>
{
    let headers = await homePage.getHomePageHeaders();
    console.log('Home page headers: ', headers);
    expect.soft(headers).toHaveLength(4);
    expect.soft(headers).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
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
