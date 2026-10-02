import { test, expect } from '../../src/fixtures/apiFixtures';

let tokenID: string;

let headers =
{
    'Content-Type': 'application/json'
}

test.beforeEach('Generate the token', async ({ apiHelper }) =>
{
    let creds = {
                username : 'admin',
                password : 'password123'
                }

    let response = await apiHelper.post('/auth', creds, headers);

    expect(response.status).toBe(200);
    console.log(response.body);
    tokenID = response.body.token;

});


test('Booking CRUD with token', async ({ apiHelper }) =>
{
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

    let postResponse = await apiHelper.post('/booking', userData, headers);

    expect(postResponse.status).toBe(200);
    console.log(postResponse.body);
    let bookingID = postResponse.body.bookingid;



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

    let putHeaders = {
        Cookie: `token=${tokenID}`
    };

    let putResponse = await apiHelper.put(`/booking/${bookingID}`, updatedUserData, putHeaders);

    expect(putResponse.status).toBe(200);
    expect(putResponse.body.additionalneeds).toBe(updatedUserData.additionalneeds);
    expect(putResponse.body.firstname).toBe(updatedUserData.firstname);


    let deleteResponse = await apiHelper.delete(`/booking/${bookingID}`, putHeaders);
    expect(deleteResponse.status).toBe(201);
});