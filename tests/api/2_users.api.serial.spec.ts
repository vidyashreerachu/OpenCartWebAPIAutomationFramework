import { test, expect } from '../../src/fixtures/apiFixtures';

const token = process.env.API_TOKEN!;

let AUTH_HEADER = {
    Authorization: `Bearer ${token}`
}

let userID: any;

test.describe.serial('Running E2E go rest CRUD apis', () =>
{
    test('GET API - get all users', async ({ apiHelper }) =>
    {
        let response = await apiHelper.get('/public/v2/users', AUTH_HEADER);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('POST API -- create a user', async ({ apiHelper }) =>
    {
        let userData = {
            name: 'Ananya Singh',
            email: `ananya.${Date.now()}@example.com`,
            gender: 'female',
            status: 'active'
        }

        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);

        expect(response.status).toBe(201);
        userID = response.body.id;
        console.log('User ID: ', userID);
    });

    test('PUT API -- update a user', async ({ apiHelper }) =>
    {
        let updatedData = {
            name: 'Ananya Singh',
            email: `ananya.${Date.now()}@example.com`,
            gender: 'male',
            status: 'inactive'
        }

        let response = await apiHelper.put(`/public/v2/users/${userID}`, updatedData, AUTH_HEADER);

        expect(response.status).toBe(200);
        expect(response.body.gender).toBe(updatedData.gender);
        expect(response.body.status).toBe(updatedData.status);
    });

    test('DELETE API -- delete a user', async ({ apiHelper }) =>
    {
        let response = await apiHelper.delete(`/public/v2/users/${userID}`, AUTH_HEADER);

        expect(response.status).toBe(204);
    });
})