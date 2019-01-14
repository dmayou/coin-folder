const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const query = `SELECT * FROM "condition" ORDER BY "id";`;
    pool.query(query)
        .then( (results) => {
            res.send(results.rows);
        }
        ).catch( (err) => {
            res.sendStatus(500);
        }); 
    }
);

module.exports = router;