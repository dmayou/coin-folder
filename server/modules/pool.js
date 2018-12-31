const databaseName = 'coin_folder';

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = { // config for Heroku
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl
    max: 10, // max clients in pool
    idleTimeoutMillis: 30000, // time before idle client connection closed
  };
} else {
  config = { // config for local network
    host: 'localhost', // postgres database server
    port: 5432, // env var: PGPORT
    database: databaseName, // env var: PGDATABASE
    max: 10, // max clients in pool
    idleTimeoutMillis: 30000, // time before idle client connection closed
  };
}

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
