# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/4_users.api.schema.spec.ts >> @smoke Get a user - schema test
- Location: tests/api/4_users.api.schema.spec.ts:72:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1   | /*
  2   | Schema : type of response data
  3   | ajv -- node lib for the schema validation
  4   | npm install ajv
  5   | 
  6   | 
  7   | We can verify the schema in three ways:
  8   | -------------------------------------------
  9   | 1. Change the expected type of a property
  10  | 
  11  | For example, change the type of id from integer to string.
  12  | Since the actual value of id is a number, the TC should fail.
  13  | 
  14  | 2. Add an additional required field
  15  | 
  16  | For example, add city to the required fields.
  17  | Since city is not present in the response, the TC should fail because a mandatory field is missing.
  18  | 
  19  | 3. Remove a required field
  20  | 
  21  | For example, remove status from the required fields.
  22  | The TC should pass because status is no longer mandatory, and the response can still contain additional fields.
  23  | */
  24  | 
  25  | import { test, expect } from '../../src/fixtures/apiFixtures';
  26  | import Ajv  from 'ajv';
  27  | 
  28  | 
  29  | const token = process.env.API_TOKEN!;
  30  | 
  31  | let AUTH_HEADER = 
  32  | {
  33  |     Authorization: `Bearer ${token}`
  34  | }
  35  | 
  36  | //setup the AJV
  37  | let ajv = new Ajv();
  38  | 
  39  | let userSchema = {
  40  |   "type": "object",
  41  |   "properties": {
  42  |     "id": {
  43  |       "type": "number"
  44  |     },
  45  |     "name": {
  46  |       "type": "string"
  47  |     },
  48  |     "email": {
  49  |       "type": "string"
  50  |     },
  51  |     "gender": {
  52  |       "type": "string"
  53  |     },
  54  |     "status": {
  55  |       "type": "string"
  56  |     }
  57  |   },
  58  |   "required": [
  59  |     "id", 
  60  |     "name", 
  61  |     "email", 
  62  |     "gender", 
  63  |     "status"
  64  | ]};
  65  | 
  66  | 
  67  | let userArraySchema = {
  68  |     "type": "array",
  69  |     "items": userSchema
  70  | }
  71  | 
  72  | test('@smoke Get a user - schema test', async ({ apiHelper }) =>
  73  | {
  74  |     let userData =
  75  |     {
  76  |         name: 'apiautomation',
  77  |         email: `apiautomation_${Date.now()}@open.com`,
  78  |         gender: 'male',
  79  |         status: 'active'
  80  |     }
  81  | 
  82  |     let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
  83  | 
  84  |     expect(response.status).toBe(201);
  85  |     expect(response.body.name).toBe(userData.name);
  86  |     let userID = response.body.id;
  87  | 
  88  |     //Get a user
  89  |     let getResponse = await apiHelper.get(`/public/v2/users/${userID}`, AUTH_HEADER);
> 90  |     expect(getResponse.status).toBe(200);
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  91  | 
  92  |     //verify response schema
  93  |     let validate = ajv.compile(userSchema);
  94  |     let isSchemaValid = validate(getResponse.body);
  95  |     if(!isSchemaValid)
  96  |     {
  97  |         console.log("SCHEMA ERRORS: ", validate.errors);
  98  |     }
  99  | 
  100 |     expect(isSchemaValid).toBeTruthy();
  101 | });
  102 | 
  103 | 
  104 | test('get all users - schema test', async ({ apiHelper }) => 
  105 | {
  106 |     //get all users
  107 |     let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
  108 |     expect(getUsersResponse.status).toBe(200);
  109 | 
  110 |     //verify response schema
  111 |     let validate = ajv.compile(userArraySchema);
  112 |     let isSchemaValid = validate(getUsersResponse.body);
  113 |     if (!isSchemaValid) 
  114 |     {
  115 |         console.log("SCHEMA ERRORS: ", validate.errors);
  116 |     }
  117 | 
  118 |     expect(isSchemaValid).toBeTruthy();
  119 | });
```