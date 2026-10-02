import { test, expect, request } from '@playwright/test';

let AUTH_TOKEN = {
    Authorization: `Bearer efc0afb0b75b98c20dcc5481b4abcf1677b3309dad5ec3918891359c3840a306`
}

test('GET - Get all users', async ({ request }) =>
{
    let response = await request.get('https://gorest.co.in/public/v2/users' , {
        headers: AUTH_TOKEN
    });

    //console.log(response);

    console.log(await response.json());
    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);
});


test('GET - Get single user', async ({ request }) =>
{
    let response = await request.get('https://gorest.co.in/public/v2/users/8612634', {
        headers: AUTH_TOKEN
    });

    console.log(await response.json());
    console.log(response.status()); //200
    console.log(response.statusText()); //OK
    expect(response.status()).toBe(200);
});


test('POST - Create a user', async ({ request }) =>
{
    //User JS Object
    let userData = {
        name: 'Dulari Nehru',
        email: `nehru_${Date.now()}@marvin.com`,
        gender: 'female',
        status: 'active'
    }

    //JS Object ---> JSON (Serialization)
    //JSON.stringify();
    //Note: Playwright handles the JSON serialization automatically. no need to do it explicitly 

    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    console.log(await response.json());
    console.log(response.status()); //201
    console.log(response.statusText()); //Created
    expect(response.status()).toBe(201);
});



test('PUT - Update a user', async ({ request }) =>
{
    //User JS Object
    let userData = {
        gender: 'male',
        status: 'inactive'
    }

    //JS Object ---> JSON (Serialization)
    //JSON.stringify();
    //Note: Playwright handles the JSON serialization automatically. no need to do it explicitly 

    let response = await request.put('https://gorest.co.in/public/v2/users/8619252', {
        headers: AUTH_TOKEN,
        data: userData
    });

    console.log(await response.json());
    console.log(response.status()); //200
    console.log(response.statusText()); //OK
    expect(response.status()).toBe(200);
});


test('DELETE - Delete a user', async ({ request }) =>
{
    let response = await request.delete('https://gorest.co.in/public/v2/users/8619252', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status()); //204
    console.log(response.statusText()); //No Content
    expect(response.status()).toBe(204);
});


//https://restful-booker.herokuapp.com/apidoc/index.html