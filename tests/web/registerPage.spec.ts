import { test, expect } from '../../src/fixtures/pageFixtures';

test.beforeEach(async ({ loginPage }) =>
{
    await loginPage.goToLoginPage();
    await loginPage.gotoRegisterationPage();
});

test('Verify user is able to register successfully', async ({ registerPage, page }) =>
{
    await registerPage.completeRegistration({
        fname: 'mark',
        lname: 'jackson',
        email: 'mark.jac4@hotmail.com',
        phone: '897868781',
        password: 'pw123'
    });

    expect(await registerPage.verifySuccessMsg()).toBeTruthy();

    await page.pause();
});