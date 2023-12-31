// // // Connect to DB
// // const { Client } = require('pg');

// // // change the DB_NAME string to whatever your group decides on
// // const DB_NAME = 'bedbugcofe';
// // change the DB_NAME string to whatever your group decides on
// const { Client } = require('pg');
// const DB_NAME = 'bedBugCoffee';

// const DB_URL =
//   process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

// let client;

// // github actions client config
// if (process.env.CI) {
//   client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   });
// } else {
//   // local / heroku client config
//   client = new Client(DB_URL);
// }

// module.exports = client;

const { Client } = require('pg');
const DB_NAME = 'bedBugCoffee';
const connectionString =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
