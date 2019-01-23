const app = require('../server.js');
const testServer = require('supertest');

describe('Test for 403 rejection when not logged in', () => {
    const collectionId = 1;
    const searchParams = {};
    const apiRoutes = [
        `user`,
        `collection_type`,
        `user_collections/`,
        `can_add_collections/`,
        `user_item_counts`,
        `collection_items/${collectionId}`,
        `collection_count/${collectionId}/${searchParams}`,
        `found_counts`,
        `other_found_avg/${collectionId}`,
        `collectionItems/${collectionId}`,
    ];
    for (let route of apiRoutes) {
        console.log(route);
        test(`/api/${route} route requires authentication`, () => {
            testServer(app).get(`/api/${route}`)
                .then((resp) => {
                    expect(resp.statusCode).toBe(403);
                }
            );
        });
    }
});