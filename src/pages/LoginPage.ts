import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage
{
    // 1. private Locators
    private readonly emailID: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly loginPageHeaders: Locator;
    private readonly loginLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginErrorMessage: Locator;
    


    // 2. constructor of the page class: initialize the locators
    constructor (page: Page)
    {
        super(page);

        this.emailID = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.loginPageHeaders = page.getByRole('heading', { level: 2 });
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');

    }


    // 3. public page actions(methods) / behaviour: Encapsulation

    async goToLoginPage(): Promise<void>
    {
        await this.page.goto('index.php?route=account/login');
    }

    async doLogin(emailId: string, password: string)
    {
        console.log(`Credtials are: ${emailId} , ${password}`);
        await this.emailID.fill(emailId);
        await this.password.fill(password);
        await this.loginBtn.click();
        
    }

    async isForgottenPwdLinkExist(): Promise<boolean>
    {
        return await this.forgotPasswordLink.isVisible();
    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean>
    {
        return await this.loginErrorMessage.isVisible();
    }
       
    async getLoginPageHeaders(): Promise<string[]>
    {
        return await this.loginPageHeaders.allInnerTexts();
    }

    async gotoRegisterationPage(): Promise<void>
    {
        await this.registerLink.click();
    }
}