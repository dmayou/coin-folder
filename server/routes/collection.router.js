const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

// Posts collection_items rows for a given collection_type.id
// by copying rows from 'items'
router.post('/collection_items/:userCollectionId', rejectUnauthenticated, (req, res) => {
    const { userCollectionId } = req.params;
    console.log('collection_items POST. userCollectionID=', userCollectionId);
    const query =
        `INSERT INTO collection_items (user_collection_id, item_id)
        SELECT user_collections.id AS user_collection_id, items.id FROM items
        JOIN user_collections ON user_collections.id=${userCollectionId}
        WHERE items.collection_id=user_collections.collection_id;`;
    pool.query(query)
        .then( (results) => {
            res.sendStatus(201);
        }).catch( (err) => {
            res.sendStatus(500);
        });
});

module.exports = router;