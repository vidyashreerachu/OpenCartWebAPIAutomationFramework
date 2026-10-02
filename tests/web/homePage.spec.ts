import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) =>
{
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwapril@pw.com', 'pw123');
    homePage = new HomePage(page);
});

test.skip('Home page title test', async () =>
{
    let title = await homePage.getHomePageTitle();
    console.log('Home page title: ', title);
    expect (title).toBe('My Account');
});

test.skip('Logout link exist test', async () =>
{
    expect (homePage.isLogoutLinkExist).toBeTruthy();
});

test.skip('Home page headers exist test', async () =>
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