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

router.get('/can_add_collections', rejectUnauthenticated, (req, res) => {
    const query =
        `SELECT * FROM "collection_type" 
        WHERE "collection_type"."id" NOT IN (
	        SELECT "collection_type"."id" FROM "collection_type"
	        JOIN "user_collections" ON "user_collections"."collection_id"="collection_type"."id"
	        WHERE "user_collections"."user_id"=$1
        )
        ORDER BY "collection_type"."id";`;
    pool.query(query, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
        });
});

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
        WHERE "ci"."user_collection_id"=$1 ${queryWhere}
        ORDER BY "items"."year" ASC, "ci"."item_id" ASC;`;
    pool.query(query, [userCollectionId])
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
        `SELECT MIN("items"."year"), 
            MAX("items"."year"), 
            to_char(MIN("ci"."date_found"), 'Mon DD, YYYY') AS "first_find", 
            COUNT(*), 
            SUM("found"::int),
            (   SELECT COUNT(*) FROM "collection_items" 
                WHERE date_found > current_date - 30
            ) AS "found_last_month"
        FROM "collection_items" AS "ci"
        JOIN "items" ON "items"."id"="ci"."item_id"
        WHERE "user_collection_id"=${userCollectionId}`;
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
        `SELECT MIN("items"."year"), MAX("items"."year"), COUNT(*), SUM("found"::int) FROM "collection_items" AS "ci"
        JOIN "items" ON "items"."id"="ci"."item_id"
        WHERE "user_collection_id"=$1 ${queryWhere};`;
    pool.query(query, [userCollectionId])
        .then((results) => {
            res.send(results.rows[0]);
        }).catch((err) => {
            res.sendStatus(500);
        }
    );
});

// returns row for each item and count of other users who are collecting item, but haven't found it
router.get('/user_item_counts', rejectUnauthenticated, (req, res) => {
    const query = 
        `SELECT item_id, COUNT(user_id) FROM "collection_items"
        JOIN "user_collections" ON "user_collections"."id"="collection_items"."user_collection_id"
        WHERE "found"=FALSE AND "user_id"<>$1
        GROUP BY "item_id"
        ORDER BY "item_id";`;
    pool.query(query, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
        })
});

// returns 12 rows representing counts of finds for user and finds for other
// users for past 12+1 months (390 days) for ALL collections.
// Most recent month is first. Could return fewer than 12 rows if neither 
// group has finds in all months.
router.get('/found_counts', rejectUnauthenticated, (req, res) => {
    const query =
        `WITH "found_months" AS (
            SELECT user_id,
            CONCAT(to_char(date_found, 'Month'), extract(year from date_found)) AS "mon_year",
            CONCAT(extract(year from date_found), to_char(date_found, 'MM')) AS "sort_field"
            FROM "collection_items"
            JOIN "user_collections" ON "user_collections"."id" = "collection_items"."user_collection_id"
            WHERE date_found IS NOT NULL AND current_date - date_found < 365
        )
        SELECT
            (SELECT COUNT("id") FROM "user") - 1 AS "num_other_users",
            COUNT(*) FILTER(WHERE "user_id" = $1),
            COUNT(*) FILTER(WHERE "user_id" <> $1) AS "other_count",
            "mon_year"
            FROM "found_months"
        GROUP BY "mon_year", sort_field--these fields will appear as distinct pairs
        ORDER BY "sort_field" LIMIT 12;`;
    pool.query(query, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        }).catch((err) => {
            res.sendStatus(500);
        }
    );
});

// Makes user_collections row and 
// posts collection_items rows for a given collection_type.id
// by copying rows from 'items'
router.post('/collection_items/:collectionId', rejectUnauthenticated, (req, res) => {
    
    const { collectionId } = req.params;
    // query makes new user_collection, then inserts items 
    // matching collection_id into collection_items
    const query =
        `WITH "new_collection" AS (
            INSERT INTO "user_collections" ("user_id", "collection_id") 
            VALUES ($1, $2) 
            RETURNING "user_collections"."id" AS "new_id") 
        INSERT INTO "collection_items" ("user_collection_id", "item_id") 
            SELECT (SELECT "new_id" FROM "new_collection") AS "user_collection_id", 
            "items"."id" FROM "items" 
            WHERE "items"."collection_id" = $2;`;
    pool.query(query, [req.user.id, collectionId])
        .then( (results) => {
            res.sendStatus(201);
        }).catch( (err) => {
            res.sendStatus(500);
        });
    }
);

module.exports = router;