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

router.get('/user_collections/', rejectUnauthenticated, (req, res) => {
    const query = 
        `SELECT "user_collections"."id" AS "coll_id", * FROM "user_collections"
        JOIN "collection_type" ON "collection_type"."id"="user_collections"."collection_id"
        WHERE "user_collections"."user_id"=$1
        ORDER BY "collection_type"."id" ASC;`;
    pool.query(query, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
        });
}
);

router.get('/collection_items/:userCollectionId/:searchParams', rejectUnauthenticated, (req, res) => {
    const { userCollectionId, searchParams } = req.params;
    const queryWhere = buildCollectionQuery(JSON.parse(searchParams));
    const query = 
        `SELECT 
            "ci"."id" AS "ci_id", "user_collection_id", "item_id", "found", 
                to_char("date_found", 'Mon DD, YYYY') AS "date_found",
                "location_found", "will_trade",
            "items".*, "condition"."grade", 
            "condition"."description" 
            FROM "collection_items" AS "ci"
        JOIN "items" ON "ci"."item_id"="items"."id"
        LEFT JOIN "condition" ON "ci"."condition_id"="condition"."id"
        WHERE "ci"."user_collection_id"=${userCollectionId} ${queryWhere}
        ORDER BY "items"."year" ASC, "ci"."item_id" ASC;`;
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
    const { userCollectionId, searchParams } = req.params;
    const queryWhere = buildCollectionQuery(JSON.parse(searchParams));
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