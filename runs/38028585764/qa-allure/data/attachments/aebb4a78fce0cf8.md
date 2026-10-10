# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/3_users.api.parallel.spec.ts >> @regression Create a user
- Location: tests/api/3_users.api.parallel.spec.ts:30:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | import { test, expect } from '../../src/fixtures/apiFixtures';
  2  | 
  3  | const token = process.env.API_TOKEN!;
  4  | 
  5  | let AUTH_HEADER = {
  6  |     Authorization : `Bearer ${token}`
  7  | }
  8  | 
  9  | 
  10 | //Helper - generic function -- create a user (POST CALL)
  11 | async function createUser(apiHelper: any)
  12 | {
  13 |     let userData = 
  14 |     {
  15 |         name: 'Shashank Singh',
  16 |         email: `Singh.${Date.now()}@example.com`,
  17 |         gender: 'male',
  18 |         status: 'active'
  19 |     };
  20 | 
  21 |     let response = await apiHelper.post('/public/v2/users', userData , AUTH_HEADER);
  22 | 
  23 |     expect(response.status).toBe(201);
  24 |     return response.body;
  25 | }
  26 | 
  27 | 
  28 | //Test 1: Create a user test + verify: AAA
  29 | //POST ---> userID ---> GET /userID --> verify
  30 | test('@regression Create a user', async ({ apiHelper }) =>
  31 | {
  32 |     //create a user
  33 |     let postResponse = await createUser(apiHelper);
  34 | 
  35 |     //get a user
  36 |     let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
> 37 |     expect(getResponse.status).toBe(200);
     |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  38 |     expect.soft(getResponse.body.name).toBe('Shashank Singh');
  39 | });
  40 | 
  41 | 
  42 | //Test 2: Update a user test + verify: AAA
  43 | //POST ---> userID ---> GET /userID --> PUT /userID ---> GET /userID --> verify
  44 | test('@regression Update a user', async ({ apiHelper }) =>
  45 | {
  46 |     //1. create a user
  47 |     let postResponse = await createUser(apiHelper);
  48 | 
  49 |     //2. get a user
  50 |     let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
  51 |     expect(getResponse.status).toBe(200);
  52 |     expect.soft(getResponse.body.name).toBe('Shashank Singh');
  53 | 
  54 |     //3. update a user
  55 |     let updatedData =
  56 |     {
  57 |         name: 'Shashank Rajput',
  58 |         email: `Rajput@example.com`,
  59 |         gender: 'male',
  60 |         status: 'inactive'
  61 |     }
  62 | 
  63 |     let putResponse = await apiHelper.put(`/public/v2/users/${postResponse.id}`, updatedData, AUTH_HEADER);
  64 |     expect(putResponse.status).toBe(200);
  65 |     expect.soft(putResponse.body.name).toBe(updatedData.name);
  66 |     expect.soft(putResponse.body.status).toBe(updatedData.status);
  67 | 
  68 |     //4. get a user
  69 |     let getUpdatedResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
  70 |     expect(getUpdatedResponse.status).toBe(200);
  71 |     expect.soft(getUpdatedResponse.body.name).toBe(updatedData.name);
  72 |     expect.soft(getUpdatedResponse.body.status).toBe(updatedData.status);
  73 | 
  74 | });
  75 | 
  76 | 
  77 | //Test 3: Delete a user test + verify: AAA
  78 | //POST ---> userID ---> GET /userID --> Delete /userID (204) ---> GET /userID (404) --> verify
  79 | test('@regression Delete a user', async ({ apiHelper }) =>
  80 | {
  81 |     //1. create a user
  82 |     let postResponse = await createUser(apiHelper);
  83 | 
  84 |     //2. get a user
  85 |     let getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
  86 |     expect(getResponse.status).toBe(200);
  87 |     expect.soft(getResponse.body.name).toBe('Shashank Singh');
  88 | 
  89 |     //3. delete a user
  90 |     let deleteResponse = await apiHelper.delete(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
  91 |     expect(deleteResponse.status).toBe(204);
  92 | 
  93 |     //4. get a user
  94 |     getResponse = await apiHelper.get(`/public/v2/users/${postResponse.id}`, AUTH_HEADER);
  95 |     expect(getResponse.status).toBe(404);
  96 |     expect(getResponse.body.message).toBe('Resource not found');
  97 | 
  98 | });
```