import { test, expect, Page } from '@playwright/test';

let API_Headers: any;
let contactID: any;
let tokenID: string;
let emailID: string;

test.beforeAll(async ({ request }) =>
{
    let testData = 
    {
        "firstName": "ricchie",
        "lastName": "baby",
        "email": `test${Date.now()}@gmail.com`,
        "password": "pw12345"
    }

    let tokenResponse = await request.post('https://thinking-tester-contact-list.herokuapp.com/users',
    {
        data: testData
    });

    expect(tokenResponse.status()).toBe(201);
    let tokenIDResponse = await tokenResponse.json();
    tokenID = tokenIDResponse.token;
    emailID = tokenIDResponse.user.email;

    API_Headers = 
    {
        Authorization: `Bearer ${tokenID}`
    }
});


async function goToWebPage(page: Page)
{
    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await page.getByRole('textbox', { name: 'Email' }).fill(emailID);
    await page.getByPlaceholder('Password').fill('pw12345');
    await page.getByRole('button', { name: 'Submit' }).click();
    return await page.locator('tr.contactTableBodyRow').count();
}

test('Contact CRUD', async ({ request, page }) =>
{

    let countNum = await goToWebPage(page);
    expect(countNum).toBe(0);

    let userData = 
    {
        "firstName": "john",
        "lastName": "jack",
        "birthdate": "1990-09-09",
        "email": "ricchierichbaby@gmail.com",
        "phone": "8005555555",
        "street1": "1 Main St.",
        "street2": "Apartment A",
        "city": "LA",
        "stateProvince": "KS",
        "postalCode": "12345",
        "country": "USA"
    }

    let postResponse = await request.post(process.env.Contact_URL!, {
        headers: API_Headers,
        data: userData
        });

    expect(postResponse.status()).toBe(201);
    //console.log(await postResponse.json());
    let jsonResponse = await postResponse.json();
    contactID = jsonResponse._id;


    let getResponse = await request.get(`${process.env.Contact_URL!}/${contactID}`, {
        headers: API_Headers
    });
    expect(getResponse.status()).toBe(200);

    countNum = await goToWebPage(page);
    expect(countNum).toBeGreaterThan(0);

    let updatedData = 
    {
        "firstName": "john",
        "lastName": "james",
        "birthdate": "1990-09-09",
        "email": "ricchierichbaby@gmail.com",
        "phone": "8005555566",
        "street1": "1 Main St.",
        "street2": "Apartment A",
        "city": "LA",
        "stateProvince": "KS",
        "postalCode": "12345",
        "country": "USA"
    }

    let putResponse = await request.put(`${process.env.Contact_URL!}/${contactID}`, {
        headers: API_Headers,
        data: updatedData
        });
    
    expect(putResponse.status()).toBe(200);
    let jsonPutResponse = await putResponse.json();
    expect(jsonPutResponse.lastName).toBe(updatedData.lastName);
    expect(jsonPutResponse.phone).toBe(updatedData.phone);


    let deleteResponse = await request.delete(`${process.env.Contact_URL!}/${contactID}`, {
        headers: API_Headers
    });
    expect(deleteResponse.status()).toBe(200);

    countNum = await goToWebPage(page);
    expect(countNum).toBe(0);

});