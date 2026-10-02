/*
API Mocking means creating a fake API response instead of calling the real server
Instead of sending a request to the actual backend, Playwright intercepts the request and returns 
the data that we define.
🎭
Mocking = Pretending the backend already replied with the data you want.

**slash* is a glob pattern that matches requests to any URL.
page.route() allows us to intercept network requests made by the page.
route.request() gives us information about the intercepted request, such as:
    HTTP method — GET, POST, PUT, DELETE, etc.
    URL
    Headers
    POST/request data
    route.continue() allows the request to continue normally.

Why do we use it?
    It is useful for debugging and validating network/API activity.

Why do we use API Mocking?
    Suppose the backend team hasn't finished developing the API.

Without mocking:
❌ Your UI cannot display any data.

With mocking:
✅ You can continue testing the UI using fake data.

Benefits of API Mocking
✅ No dependency on backend developers
✅ Faster test execution
✅ No internet required
✅ Predictable test data
✅ Easier to test edge cases
✅ Can simulate server errors (404, 500, etc.)
*/

import { test, expect } from '@playwright/test';


test('Intercept all network calls and log them', async ({ page }) =>
{
    // page.route('**/*') to intercept network requests matching all URL patterns
    // web app --> intercept the network calls and log them..
    // **/* --> wildcard pattern for all URLs

    await page.route('**/*', async (route) =>
    {
        console.log(route.request().method(), route.request().url());
        await route.continue();
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});

//Intercept with mocking: mocking with fake data/response

test('Network mocking with JSON data', async ({ page }) =>
{
    let fakeProducts = 
    [
        {name: 'Fake MackBook Pro', price: '$599'},
        {name: 'Fake iPhone Pro', price: '$209'}
    ];

    // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    
    await page.route('**/index.php?route=product/search&search=macbook', async (route) =>
    {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        });
    });

    await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook');
    await page.pause();
});


test('Network mocking with HTML data', async ({ page }) =>
{
    let htmlData = 
            `
            <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>`;
    

    // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook

    await page.route('**/index.php?route=product/search&search=macbook', async (route) =>
    {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: htmlData
        });
    });

    await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook');
    await page.pause();
});


test('Network mocking with 500 error', async ({ page }) =>
{
    // https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook
    await page.route('**/index.php?route=product/search&search=macbook', async (route) =>
    {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({error: 'Internal Server Error'})
        });
    });

    await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook');
    await page.pause();
});


test('Network mocking with 401 error', async ({ page }) =>
{
    await page.route('**/index.php?route=account/login', async (route) =>
    {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: 'Unauthorized Access'
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    await page.pause();
});


test('Junk data', async ({ page }) =>
{

    await page.route('**/index.php?route=common/home', async(route)=>
    {
        await route.fulfill({
            status: 404,
            contentType: 'application/json',
            body: 'Unauthorized Access'
        })
    })

    await page.goto('https://abc.com/opencart/index.php?route=common/home');
    await page.pause();
});