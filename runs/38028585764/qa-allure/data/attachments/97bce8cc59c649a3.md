# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/loginPageWithReportConfig.spec.ts >> @regression Login to app - Reporting Labs Configuration
- Location: tests/web/loginPageWithReportConfig.spec.ts:41:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class LoginPage extends BasePage
  5  | {
  6  |     // 1. private Locators
  7  |     private readonly emailID: Locator;
  8  |     private readonly password: Locator;
  9  |     private readonly loginBtn: Locator;
  10 |     private readonly forgotPasswordLink: Locator;
  11 |     private readonly loginPageHeaders: Locator;
  12 |     private readonly loginLink: Locator;
  13 |     private readonly registerLink: Locator;
  14 |     private readonly loginErrorMessage: Locator;
  15 |     
  16 | 
  17 | 
  18 |     // 2. constructor of the page class: initialize the locators
  19 |     constructor (page: Page)
  20 |     {
  21 |         super(page);
  22 | 
  23 |         this.emailID = page.getByRole('textbox', { name: 'E-Mail Address' });
  24 |         this.password = page.getByRole('textbox', { name: 'Password' });
  25 |         this.loginBtn = page.getByRole('button', { name: 'Login' });
  26 |         this.forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
  27 |         this.loginPageHeaders = page.getByRole('heading', { level: 2 });
  28 |         this.loginLink = page.getByRole('link', { name: 'Login' });
  29 |         this.registerLink = page.getByRole('link', { name: 'Register' });
  30 |         this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
  31 | 
  32 |     }
  33 | 
  34 | 
  35 |     // 3. public page actions(methods) / behaviour: Encapsulation
  36 | 
  37 |     async goToLoginPage(): Promise<void>
  38 |     {
> 39 |         await this.page.goto('index.php?route=account/login');
     |                         ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  40 |     }
  41 | 
  42 |     async doLogin(emailId: string, password: string): Promise<void>
  43 |     {
  44 |         console.log(`App Credtials are: ${emailId} , ${password}`);
  45 |         await this.emailID.fill(emailId);
  46 |         await this.password.fill(password);
  47 |         await this.loginBtn.click();
  48 |     }
  49 | 
  50 |     async isForgottenPwdLinkExist(): Promise<boolean>
  51 |     {
  52 |         return await this.forgotPasswordLink.isVisible();
  53 |     }
  54 | 
  55 |     async isInvalidLoginErrorDisplayed(): Promise<boolean>
  56 |     {
  57 |         return await this.loginErrorMessage.isVisible();
  58 |     }
  59 |        
  60 |     async getLoginPageHeaders(): Promise<string[]>
  61 |     {
  62 |         return await this.loginPageHeaders.allInnerTexts();
  63 |     }
  64 | 
  65 |     async gotoRegisterationPage(): Promise<void>
  66 |     {
  67 |         await this.registerLink.click();
  68 |     }
  69 | }
```