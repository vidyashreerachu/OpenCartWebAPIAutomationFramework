import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage
{
    private readonly registerHeader: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly emailID: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPwd: Locator;
    private readonly subscribe: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueBtn: Locator;
    private readonly successMsg: Locator;

    constructor(page: Page)
    {
        super(page);
        this.registerHeader = page.getByRole('heading', { level: 1 });
        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lastName = page.getByRole('textbox', { name: '* Last Name' });
        this.emailID = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.password = page.locator('input#input-password');
        this.confirmPwd = page.locator('input#input-confirm');
        this.subscribe = page.getByRole('radio', { name: 'Yes'});
        this.privacyPolicy = page.locator('input[name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.successMsg = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    async getRegisterPageHeader(): Promise<string>
    {
        return await this.registerHeader.innerText();
    }

    async setFirstName(fname: string): Promise<void>
    {
        await this.firstName.fill(fname);
    }

    async setLastName(lname: string): Promise<void>
    {
        await this.lastName.fill(lname);
    }

    async setEmail(email: string): Promise<void>
    {
        await this.emailID.fill(email);
    }

    async setTelephone(phone: string): Promise<void>
    {
        await this.telephone.fill(phone);
    }

    async setPassword(pwd: string): Promise<void>
    {
        await this.password.fill(pwd);
    }

    async setConfirmPwd(confirmPwd: string): Promise<void>
    {
        await this.confirmPwd.fill(confirmPwd);
    }

    async selectSubcribe(): Promise<void>
    {
        await this.subscribe.click();
    }

    async setPrivacyPolicy(): Promise<void>
    {
        await this.privacyPolicy.click();
    }

    async clickContinue(): Promise<void>
    {
        await this.continueBtn.click();
    }

    async verifySuccessMsg(): Promise<boolean>
    {
        return await this.successMsg.isVisible();
    }

    async completeRegistration(userData: {
        fname: string,
        lname: string,
        email: string,
        phone: string,
        password: string
    }) : Promise<void>
    {
        await this.setFirstName(userData.fname);
        await this.setLastName(userData.lname);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.phone);
        await this.setPassword(userData.password);
        await this.setConfirmPwd(userData.password);
        await this.selectSubcribe();
        await this.setPrivacyPolicy();
        await this.clickContinue();
    }
}