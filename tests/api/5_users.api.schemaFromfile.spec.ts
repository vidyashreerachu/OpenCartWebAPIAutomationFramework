import { test, expect } from '../../src/fixtures/apiFixtures';
import Ajv  from 'ajv';
import fs from 'fs';

const token = process.env.API_TOKEN!;

let AUTH_HEADER = 
{
    Authorization: `Bearer ${token}`
}

//setup the AJV
let ajv = new Ajv();

let userArraySchema = {
    "type": "array",
    "items": JSON.parse(fs.readFileSync('./src/schema/userSchema.json', 'utf-8'))
}

test('Get a user - schema test', async ({ apiHelper }) =>
{
    let userData =
    {
        name: 'apiautomation',
        email: `apiautomation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name);
    let userID = response.body.id;

    //Get a user
    let getResponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);

    //verify response schema
    let validate = ajv.compile(JSON.parse(fs.readFileSync('./src/schema/userSchema.json', 'utf-8')));
    let isSchemaValid = validate(getResponse.body);
    if(!isSchemaValid)
    {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});


test('get all users - schema test', async ({ apiHelper }) => 
{
    //get all users
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    //verify response schema
    let validate = ajv.compile(userArraySchema);
    let isSchemaValid = validate(getUsersResponse.body);
    if (!isSchemaValid) 
    {
        console.log("SCHEMA ERRORS: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();
});