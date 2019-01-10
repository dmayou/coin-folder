const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { found, date_found, location_found } = req.body;
    let condition_id;
    (req.body.condition_id === 0) ? condition_id = null : condition_id = req.body.condition_id;
    const query =
        `UPDATE "collection_items" 
        SET "found"=$1, "date_found"=$2, "condition_id"=$3, "location_found"=$4
        FROM "user_collections", "user"
        WHERE "collection_items"."id" = $5 AND "user"."id"=$6;`;
    pool.query(query, [found, date_found, condition_id, location_found, +id, req.user.id])
        .then( (result) => {
            res.sendStatus(200);
        }).catch( (err) => {
            res.sendStatus(500);
        });
});

module.exports = router;