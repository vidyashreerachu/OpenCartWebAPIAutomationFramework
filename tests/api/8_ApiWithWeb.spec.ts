import { test, expect } from '@playwright/test';

let API_Headers = 
{
    Authorization: `Bearer ${process.env.Contact_Token!}`
};

let contactID: string;

test('Contact CRUD', async ({ request }) =>
{
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
    console.log(await postResponse.json());
    let jsonResponse = await postResponse.json();
    contactID = jsonResponse._id;


    let getResponse = await request.get(`${process.env.Contact_URL!}/${contactID}`, {
        headers: API_Headers
    });
    expect(getResponse.status()).toBe(200);


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


    let deleteResponse = await request.delete(`${process.env.Contact_URL!}/${contactID}`, {
        headers: API_Headers
    });
    expect(deleteResponse.status()).toBe(200);

});