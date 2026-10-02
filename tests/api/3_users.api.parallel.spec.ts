import { test, expect } from '../../src/fixtures/apiFixtures';

const token = process.env.API_TOKEN!;

let AUTH_HEADER = {
    Authorization : `Bearer ${token}`
}


//Helper - generic function -- create a user (POST CALL)
async function createUser(apiHelper: any)
{
    let userData = 
    {
        name: 'Shashank Singh',
        email: `Singh.${Date.now()}@example.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users', userData , AUTH_HEADER);

    expect(response.status).toBe(201);
    return response.body;
}


//Test 1: Create a user test + verify: AAA
//POST ---> userID ---> GET /userID --> verify
test('Create a user', async ({ apiHelper }) =>
{
    //create a user
    let postResponse = await createUser(apiHelper);

    //get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect.soft(getResponse.body.name).toBe('Shashank Singh');
});


//Test 2: Update a user test + verify: AAA
//POST ---> userID ---> GET /userID --> PUT /userID ---> GET /userID --> verify
test('Update a user', async ({ apiHelper }) =>
{
    //1. create a user
    let postResponse = await createUser(apiHelper);

    //2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect.soft(getResponse.body.name).toBe('Shashank Singh');

    //3. update a user
    let updatedData =
    {
        name: 'Shashank Rajput',
        email: `Rajput@example.com`,
        gender: 'male',
        status: 'inactive'
    }

    let putResponse = await apiHelper.put(`/public/v2/users/${postResponse.id}`, updatedData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect.soft(putResponse.body.name).toBe(updatedData.name);
    expect.soft(putResponse.body.status).toBe(updatedData.status);

    //4. get a user
    let getUpdatedResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getUpdatedResponse.status).toBe(200);
    expect.soft(getUpdatedResponse.body.name).toBe(updatedData.name);
    expect.soft(getUpdatedResponse.body.status).toBe(updatedData.status);

});


//Test 3: Delete a user test + verify: AAA
//POST ---> userID ---> GET /userID --> Delete /userID (204) ---> GET /userID (404) --> verify
test('Delete a user', async ({ apiHelper }) =>
{
    //1. create a user
    let postResponse = await createUser(apiHelper);

    //2. get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect.soft(getResponse.body.name).toBe('Shashank Singh');

    //3. delete a user
    let deleteResponse = await apiHelper.delete(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(deleteResponse.status).toBe(204);

    //4. get a user
    getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');

});