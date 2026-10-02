/*
Schema : type of response data
ajv -- node lib for the schema validation
npm install ajv


We can verify the schema in three ways:
-------------------------------------------
1. Change the expected type of a property

For example, change the type of id from integer to string.
Since the actual value of id is a number, the TC should fail.

2. Add an additional required field

For example, add city to the required fields.
Since city is not present in the response, the TC should fail because a mandatory field is missing.

3. Remove a required field

For example, remove status from the required fields.
The TC should pass because status is no longer mandatory, and the response can still contain additional fields.
*/

import { test, expect } from '../../src/fixtures/apiFixtures';
import Ajv  from 'ajv';


const token = process.env.API_TOKEN!;

let AUTH_HEADER = 
{
    Authorization: `Bearer ${token}`
}

//setup the AJV
let ajv = new Ajv();

let userSchema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id", 
    "name", 
    "email", 
    "gender", 
    "status"
]};


let userArraySchema = {
    "type": "array",
    "items": userSchema
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
    let validate = ajv.compile(userSchema);
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