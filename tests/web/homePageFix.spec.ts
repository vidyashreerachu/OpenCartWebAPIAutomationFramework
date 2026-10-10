import { test, expect } from '../../src/fixtures/pageFixtures';

test.beforeEach(async ({ loginPage }) =>
{
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
});

test('@smoke Home page title test', async ({ homePage }) =>
{
    let title = await homePage.getHomePageTitle();
    console.log('Home page title: ', title);
    expect (title).toBe('My Account');
});

test('@smoke Logout link exist test', async ({ homePage }) =>
{
    expect (await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('@regression Home page headers exist test', async ({ homePage }) =>
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
test('@smoke App logo exists on Login Page', async ({ basePage, page }) => 
{
    await page.waitForLoadState('load', {timeout: 4000});
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke Search box exists on Login Page', async ({ basePage, page }) => 
{
    await page.waitForLoadState('load', {timeout: 4000});
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('@smoke Footer links count on Login Page', async ({ basePage, page }) => 
{
    await page.waitForLoadState('load', {timeout: 4000});
    expect(await basePage.getPageFootersCount()).toBe(16);
});

test('@smoke Cart button exists on Login Page', async ({ basePage, page }) =>
{
    await page.waitForLoadState('load', {timeout: 4000});
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});
