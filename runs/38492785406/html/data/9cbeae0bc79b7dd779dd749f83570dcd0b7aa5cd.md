# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/loginPageWithReportConfig.spec.ts >> @regression Login to app - Reporting Labs Configuration
- Location: tests/web/loginPageWithReportConfig.spec.ts:41:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - navigation [ref=f1e2]:
    - generic [ref=f1e3]:
      - button "$ Currency " [ref=f1e7] [cursor=pointer]:
        - strong [ref=f1e8]: $
        - text: Currency
        - generic [ref=f1e9]: 
      - list [ref=f1e11]:
        - listitem [ref=f1e12]:
          - link "" [ref=f1e13] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
          - text: "123456789"
        - listitem [ref=f1e15]:
          - link " My Account" [ref=f1e16] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - generic [ref=f1e17]: 
            - text: My Account
        - listitem [ref=f1e19]:
          - link " Wish List (0)" [ref=f1e20] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - generic [ref=f1e21]: 
            - text: Wish List (0)
        - listitem [ref=f1e22]:
          - link " Shopping Cart" [ref=f1e23] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart
            - generic [ref=f1e24]: 
            - text: Shopping Cart
        - listitem [ref=f1e25]:
          - link " Checkout" [ref=f1e26] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=checkout/checkout
            - generic [ref=f1e27]: 
            - text: Checkout
  - banner [ref=f1e28]:
    - generic [ref=f1e30]:
      - link [ref=f1e33] [cursor=pointer]:
        - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
        - img "naveenopencart" [ref=f1e34]
      - generic [ref=f1e36]:
        - textbox "Search" [ref=f1e37]
        - button "" [ref=f1e39] [cursor=pointer]
      - button " 0 item(s) - $0.00" [ref=f1e43] [cursor=pointer]:
        - generic [ref=f1e44]: 
        - text: 0 item(s) - $0.00
  - navigation [ref=f1e46]:
    - generic: 
    - list [ref=f1e48]:
      - listitem [ref=f1e49]:
        - link "Desktops" [ref=f1e50] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=20
      - listitem [ref=f1e51]:
        - link "Laptops & Notebooks" [ref=f1e52] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=18
      - listitem [ref=f1e53]:
        - link "Components" [ref=f1e54] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=25
      - listitem [ref=f1e55]:
        - link "Tablets" [ref=f1e56] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=57
      - listitem [ref=f1e57]:
        - link "Software" [ref=f1e58] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=17
      - listitem [ref=f1e59]:
        - link "Phones & PDAs" [ref=f1e60] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=24
      - listitem [ref=f1e61]:
        - link "Cameras" [ref=f1e62] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=33
      - listitem [ref=f1e63]:
        - link "MP3 Players" [ref=f1e64] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/category&path=34
  - generic [ref=f1e65]:
    - list [ref=f1e66]:
      - listitem [ref=f1e67]:
        - link "" [ref=f1e68] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=common/home
      - listitem [ref=f1e70]:
        - link "Account" [ref=f1e71] [cursor=pointer]:
          - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
    - generic [ref=f1e72]:
      - generic [ref=f1e73]:
        - heading "My Account" [level=2] [ref=f1e74]
        - list [ref=f1e75]:
          - listitem [ref=f1e76]:
            - link "Edit your account information" [ref=f1e77] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/edit
          - listitem [ref=f1e78]:
            - link "Change your password" [ref=f1e79] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/password
          - listitem [ref=f1e80]:
            - link "Modify your address book entries" [ref=f1e81] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
          - listitem [ref=f1e82]:
            - link "Modify your wish list" [ref=f1e83] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
        - heading "My Orders" [level=2] [ref=f1e84]
        - list [ref=f1e85]:
          - listitem [ref=f1e86]:
            - link "View your order history" [ref=f1e87] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
          - listitem [ref=f1e88]:
            - link "Downloads" [ref=f1e89] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
          - listitem [ref=f1e90]:
            - link "Your Reward Points" [ref=f1e91] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
          - listitem [ref=f1e92]:
            - link "View your return requests" [ref=f1e93] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
          - listitem [ref=f1e94]:
            - link "Your Transactions" [ref=f1e95] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
          - listitem [ref=f1e96]:
            - link "Recurring payments" [ref=f1e97] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
        - heading "My Affiliate Account" [level=2] [ref=f1e98]
        - list [ref=f1e99]:
          - listitem [ref=f1e100]:
            - link "Register for an affiliate account" [ref=f1e101] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/affiliate/add
        - heading "Newsletter" [level=2] [ref=f1e102]
        - list [ref=f1e103]:
          - listitem [ref=f1e104]:
            - link "Subscribe / unsubscribe to newsletter" [ref=f1e105] [cursor=pointer]:
              - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
      - complementary [ref=f1e106]:
        - generic [ref=f1e107]:
          - link "My Account" [ref=f1e108] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
          - link "Edit Account" [ref=f1e109] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/edit
          - link "Password" [ref=f1e110] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/password
          - link "Address Book" [ref=f1e111] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/address
          - link "Wish List" [ref=f1e112] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
          - link "Order History" [ref=f1e113] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
          - link "Downloads" [ref=f1e114] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/download
          - link "Recurring payments" [ref=f1e115] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/recurring
          - link "Reward Points" [ref=f1e116] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/reward
          - link "Returns" [ref=f1e117] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return
          - link "Transactions" [ref=f1e118] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/transaction
          - link "Newsletter" [ref=f1e119] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
          - link "Logout" [ref=f1e120] [cursor=pointer]:
            - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/logout
  - contentinfo [ref=f1e121]:
    - generic [ref=f1e122]:
      - generic [ref=f1e123]:
        - generic [ref=f1e124]:
          - heading "Information" [level=5] [ref=f1e125]
          - list [ref=f1e126]:
            - listitem [ref=f1e127]:
              - link "About Us" [ref=f1e128] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4
            - listitem [ref=f1e129]:
              - link "Delivery Information" [ref=f1e130] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6
            - listitem [ref=f1e131]:
              - link "Privacy Policy" [ref=f1e132] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3
            - listitem [ref=f1e133]:
              - link "Terms & Conditions" [ref=f1e134] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5
        - generic [ref=f1e135]:
          - heading "Customer Service" [level=5] [ref=f1e136]
          - list [ref=f1e137]:
            - listitem [ref=f1e138]:
              - link "Contact Us" [ref=f1e139] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/contact
            - listitem [ref=f1e140]:
              - link "Returns" [ref=f1e141] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/return/add
            - listitem [ref=f1e142]:
              - link "Site Map" [ref=f1e143] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=information/sitemap
        - generic [ref=f1e144]:
          - heading "Extras" [level=5] [ref=f1e145]
          - list [ref=f1e146]:
            - listitem [ref=f1e147]:
              - link "Brands" [ref=f1e148] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/manufacturer
            - listitem [ref=f1e149]:
              - link "Gift Certificates" [ref=f1e150] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/voucher
            - listitem [ref=f1e151]:
              - link "Affiliate" [ref=f1e152] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=affiliate/login
            - listitem [ref=f1e153]:
              - link "Specials" [ref=f1e154] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=product/special
        - generic [ref=f1e155]:
          - heading "My Account" [level=5] [ref=f1e156]
          - list [ref=f1e157]:
            - listitem [ref=f1e158]:
              - link "My Account" [ref=f1e159] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/account
            - listitem [ref=f1e160]:
              - link "Order History" [ref=f1e161] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/order
            - listitem [ref=f1e162]:
              - link "Wish List" [ref=f1e163] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/wishlist
            - listitem [ref=f1e164]:
              - link "Newsletter" [ref=f1e165] [cursor=pointer]:
                - /url: https://naveenautomationlabs.com/opencart/index.php?route=account/newsletter
      - separator [ref=f1e166]
      - paragraph [ref=f1e167]:
        - text: Powered By
        - link "OpenCart" [ref=f1e168] [cursor=pointer]:
          - /url: http://www.opencart.com
        - text: naveenopencart © 2026
```

# Test source

```ts
  1   | import path from 'path';
  2   | import { test, expect } from '../../src/fixtures/pageFixtures';
  3   | import { CsvHelper } from '../../src/utils/CsvHelper';
  4   | import { ExcelHelper } from '../../src/utils/ExcelHelper';
  5   | import { JsonHelper } from '../../src/utils/JsonHelper';
  6   | import * as allure from "allure-js-commons";
  7   | import { log, meta, testData } from 'reporting-labs';
  8   | 
  9   | 
  10  | test.beforeEach(async ({ loginPage }) => 
  11  | {
  12  |     await loginPage.goToLoginPage();
  13  | });
  14  | 
  15  | 
  16  | test('@regression Login to app - Allure Configuration', async ({ loginPage, homePage }) => 
  17  | {
  18  |     await allure.suite("Login Tests");
  19  |     await allure.severity("Critical");
  20  |     await allure.feature("Authentication");
  21  |     await allure.story("Valid Login");
  22  |     await allure.description("Verify user can login with valid credentials");
  23  | 
  24  |     await allure.step("Login with valid creds", async () => 
  25  |     {
  26  |         await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
  27  |     });
  28  | 
  29  |     await allure.step("Verify logout link is visible", async () => 
  30  |     {
  31  |         expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
  32  |     });
  33  | 
  34  |     await allure.step("Verify home page title is visible", async () => 
  35  |     {
  36  |     expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
  37  |     });
  38  | });
  39  | 
  40  | 
  41  | test('@regression Login to app - Reporting Labs Configuration', async ({ loginPage, homePage }) => 
  42  | {
  43  |     meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login', epic: 'US123', story: 'Num123', issue: 'Bug123'});
  44  |     
  45  |     //Displays the test data in report used in the test
  46  |     await testData({ username: process.env.APPUSERNAME!, password: process.env.PASSWORD! }, 'Login'); 
  47  | 
  48  |     await loginPage.doLogin(process.env.APPUSERNAME!, process.env.PASSWORD!);
  49  |     let pageTitle = await loginPage.getPageTitle();
  50  |     console.log(pageTitle);
  51  | 
  52  |     await log('Page Title', pageTitle); // reporting-labs - will print the title in the report
  53  | 
> 54  |     expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
      |                                                     ^ Error: expect(received).toBeTruthy()
  55  |     expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
  56  |     
  57  | });
  58  | 
  59  | 
  60  | /***************************************************************************************/
  61  | 
  62  | // DD_1: read csv data directly from the CSV file and loop the test method row wise
  63  | // Pros: light weight, easy to maintain/read, 3rd party lib, no license, flat files, fs, good for large set of test data
  64  | 
  65  | //let testCsvData = CsvHelper.readCsv('src/testdata/logindata.csv');
  66  | 
  67  | const csvPath = path.join(
  68  |     process.cwd(), //cwd - current working directory
  69  |     'src',
  70  |     'testdata',
  71  |     'logindata.csv'
  72  | );
  73  | 
  74  | const testCsvData = CsvHelper.readCsv(csvPath);
  75  | 
  76  | for(let row of testCsvData)
  77  | {
  78  |     test(`Login to app with invalid credentials with csv - ${row.username}`, async ({ loginPage }) =>
  79  |     {
  80  |         meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with CSV data', epic: 'US323', story: 'Num123', issue: 'Bug123'})
  81  |         await testData(testCsvData, 'Invalid Login Credentials');
  82  | 
  83  |         await loginPage.doLogin(row.username, row.password);
  84  |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  85  |     });
  86  | }
  87  | 
  88  | 
  89  | // DD_2: read excel data directly from the Excel file and loop the test method row wise
  90  | // Cons: maintenance & MS Original Licenses
  91  | 
  92  | //let testExcelData = ExcelHelper.readExcel('src/testdata/opencarttestdata.xlsx', 'login');
  93  | 
  94  | const excelPath = path.join(
  95  |     process.cwd(), //cwd - current working directory
  96  |     'src',
  97  |     'testdata',
  98  |     'logindata.xlsx'
  99  | );
  100 | 
  101 | const testExcelData = ExcelHelper.readExcel(excelPath, 'login');
  102 | 
  103 | for(let row of testExcelData)
  104 | {
  105 |     test(`Login to app with invalid credentials with excel - ${row.username}`, async ({ loginPage }) =>
  106 |     {
  107 |         meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with Excel data', epic: 'US311', story: 'Num123', issue: 'Bug123'})
  108 |         await testData(testExcelData, 'Invalid Login Credentials');
  109 | 
  110 |         await loginPage.doLogin(row.username, row.password);
  111 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  112 |     });
  113 | }
  114 | 
  115 | 
  116 | // DD_3: read json data directly from the Json file and loop the test method row wise
  117 | // Pros: inbuilt method: parse, lightweight, smaller data source
  118 | 
  119 | //let testJsonData = JsonHelper.readJson('src/testdata/logindata.json');
  120 | 
  121 | const jsonPath = path.join(
  122 |     process.cwd(), //cwd - current working directory
  123 |     'src',
  124 |     'testdata',
  125 |     'logindata.json'
  126 | );
  127 | 
  128 | const testJsonData = JsonHelper.readJson(jsonPath);
  129 | 
  130 | for(let row of testJsonData)
  131 | {
  132 |     test(`Login to app with invalid credentials with json - ${row.username}`, async ({ loginPage }) =>
  133 |     {
  134 |         meta({priority: 'P2', severity: 'major', owner: 'Vidya', feature:'Login with JSON data', epic: 'US911', story: 'Num123', issue: 'Bug123'})
  135 |         await testData(testJsonData, 'Invalid Login Credentials');
  136 | 
  137 |         await loginPage.doLogin(row.username, row.password);
  138 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  139 |     });
  140 | }
  141 | 
  142 | 
  143 | // To open html report
  144 | // npx playwright show-report reports\html-report --port 9324
```