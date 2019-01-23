const app = require('../server.js');
const testServer = require('supertest');

describe('Test for 403 rejection when not logged in', () => {
    const collectionId = 1;
    const searchParams = { some: 'key'};
    const apiRoutes = [
        `user`,
        `collection/collection_type`,
        `collection/user_collections`,
        `collection/can_add_collections/`,
        `collection/user_item_counts`,
        `collection/collection_items/${collectionId}/${searchParams}`,
        `collection/collection_count/${collectionId}/${searchParams}`,
        `collection/found_counts`,
        `collection/other_found_avg/${collectionId}`,
    ];
    for (let route of apiRoutes) {
        console.log(route);
        test(`/api/${route} route requires authentication`, (done) => {
            testServer(app).get(`/api/${route}`)
                .then((resp) => {
                    expect(resp.statusCode).toEqual(403);
                    done();
                }
            );
        });
    }
});

// test('It should respond 403 the LOGOUT route', async (done) => {
//     const response = await testServer(app).get('/api/user');
//     expect(response.statusCode).toBe(403);
//     done();
// });