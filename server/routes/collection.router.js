const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const buildCollectionQuery = require('../modules/buildCollectionQuery');

router.get('/collection_type', rejectUnauthenticated, (req, res) => {
    const query = 'SELECT * FROM "collection_type" ORDER BY "id" ASC;';
    pool.query(query)
        .then( (results) => {
            res.send(results.rows);
        }).catch( (err) => {
            res.sendStatus(500);
        });
    }
);

router.get('/collection_items/:userCollectionId/:filter', rejectUnauthenticated, (req, res) => {
    const { filter, userCollectionId } = req.params;
    let filterClause = '';
    switch (filter) {
        case 'all':
            filterClause = '1=1';
            break;
        case 'found':
            filterClause = '"collection_items"."found"=TRUE';
            break;
        case 'needed':
            filterClause = '"collection_items"."found"=FALSE';
            break;
        default:
            console.log('invalid filter parameter in collection_items route');
    }
    const query = 
        `SELECT "collection_items".*, "items".*, "condition"."grade", "condition"."description" FROM "collection_items"
        JOIN "items" ON "collection_items"."item_id"="items"."id"
        LEFT JOIN "condition" ON "collection_items"."condition_id"="condition"."id"
        WHERE "collection_items"."user_collection_id"=${userCollectionId} AND ${filterClause}
        ORDER BY "items"."year" ASC, "collection_items"."item_id" ASC;`;
    pool.query(query)
        .then( (results) => {
            res.send(results.rows);
        }).catch( (err) => {
            res.sendStatus(500);
        });
    }
);

router.get('/collection_stats/:userCollectionId', rejectUnauthenticated, (req, res) => {
    const { userCollectionId } = req.params;
    const query = 
        `SELECT MIN("items"."year"), MAX("items"."year"), COUNT(*), SUM("found"::int) FROM "collection_items"
        JOIN "items" ON "items"."id"="collection_items"."item_id"
        WHERE "user_collection_id"=${userCollectionId};`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows[0]);
        }).catch((err) => {
            res.sendStatus(500);
        });
    }
);

router.get('/collection_count/:userCollectionId/:searchParams', rejectUnauthenticated, (req, res) => {
    const { userCollectionId } = req.params;
    const { searchParams } = req.params;
    console.log('search params:', req.params);
    const queryWhere = buildCollectionQuery(JSON.parse(searchParams));
    console.log('queryWhere', queryWhere);
    const query =
        `SELECT MIN("items"."year"), MAX("items"."year"), COUNT(*), SUM("found"::int) FROM "collection_items"
        JOIN "items" ON "items"."id"="collection_items"."item_id"
        WHERE "user_collection_id"=${userCollectionId} ${queryWhere};`;
    pool.query(query)
        .then((results) => {
            res.send(results.rows[0]);
        }).catch((err) => {
            res.sendStatus(500);
        }
    );
})
    

// Posts collection_items rows for a given collection_type.id
// by copying rows from 'items'
router.post('/collection_items/:userCollectionId', rejectUnauthenticated, (req, res) => {
    const { userCollectionId } = req.params;
    console.log('collection_items POST. userCollectionID=', userCollectionId);
    const query =
        `INSERT INTO "collection_items" ("user_collection_id", "item_id")
        SELECT "user_collections"."id" AS "user_collection_id", "items"."id" FROM "items"
        JOIN "user_collections" ON "user_collections"."id"=${userCollectionId}
        WHERE "items"."collection_id"="user_collections"."collection_id"
        ORDER BY "items"."id";`;
    pool.query(query)
        .then( (results) => {
            res.sendStatus(201);
        }).catch( (err) => {
            res.sendStatus(500);
        });
    }
);

module.exports = router;