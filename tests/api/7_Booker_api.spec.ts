import { test, expect } from '../../src/fixtures/apiFixtures';

let tokenID: string;

test.beforeEach('Generate the token', async ({ request }) =>
{
    let creds = {
                username : 'admin',
                password : 'password123'
                }

    let response = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {'Content-Type': 'application/json'},
        data: creds
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log('Auth API Response: ', jsonResponse);
    tokenID = jsonResponse.token;

});


test('@regression Booking CRUD with token', async ({ request, page }) =>
{
    //1. create a new booking: POST -- no token needed
    let userData = {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
    };

    let postResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {'Content-Type': 'application/json'},
        data: userData
    });

    expect(postResponse.status()).toBe(200);
    let jsonPostResp = await postResponse.json();
    let bookingID = jsonPostResp.bookingid;


    //2. Update a booking by bookingID: needs token
    let updatedUserData = {
        "firstname" : "John",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Lunch"
    };

    let putResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: { Cookie: `token=${tokenID}` },
        data: updatedUserData
    });

    expect(putResponse.status()).toBe(200);
    let jsonPutResp = await putResponse.json();
    expect(jsonPutResp.additionalneeds).toBe(updatedUserData.additionalneeds);
    expect(jsonPutResp.firstname).toBe(updatedUserData.firstname);


    //3. Delete a booking by bookingID: needs token
    let deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: { Cookie: `token=${tokenID}` }
    });

    expect(deleteResponse.status()).toBe(201);
});