/*
OAuth 2.0 is more secured and provides better level of authentication.
It is the latest method of generating the authentication

1) Generate the token: It gives access token/refresh token
    a. Token API will be given by dev to generate the token
    b. Token API will have endpoint URL and
    c. Form params like grant_type, client_id, client_secret
    d. It gives the response in JSON format: 
       access_token = sdsdgsjdg776767686868

2) In the functional API we can use the generated token
eg: GET : /albums  or /users  or /products
Header: { Authorization: Bearer access_token}

Note: Generated access_token will have some validity, it might expire in 10mins, 5hrs, 1 day, 1 week, immediately etc
So the code to generate access_token should be written inside beforeEach method.

Example: When we are trying to login to ShapeMyInterview it will ask us to login with Gmail/GitHub account
Here ShapeMyInterview acts as client and Gmail acts as resource owner.
When we click on 'SignUp with google', user will be navigated to google accounts page
Internally, google will provide temporary token to the client ShapeMyInterview
Then client 'ShapeMyInterview' will send the temp token to Authorization server(present in Google)
The Authorization server will check with the resource owner 'Google' whether the temp token was shared by him.
and when resource owner confirms this, Authorization server will send the permanent access token to the client 'ShapeMyInterview'
Then 'ShapeMyInterview' can interact with/access the google API's.
*/


import { test, expect } from '@playwright/test';

let access_token: string;

let OAUTH_CONFIG = 
{
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}


test.beforeEach('POST - Generate the access token', async ({ request }) =>
{
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: { 
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
              }
        });

    let jsonResponse = await response.json();
    expect(response.status()).toBe(200);
    
    access_token = jsonResponse.access_token;
});


test('GET albums data', async ({ request }) =>
{
    let baseURL = 'https://api.spotify.com';
    let endPoint = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';

    let response = await request.get(`${baseURL}${endPoint}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    expect(response.status()).toBe(200);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(jsonBody.total_tracks);
    console.log(jsonBody.images.length);
    console.log(jsonBody.external_urls.spotify);

});