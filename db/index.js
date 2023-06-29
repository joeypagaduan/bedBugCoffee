const client = require('./client');
const models = require('./models');
const DB_NAME = 'bedBugCoffee';

module.exports = {
  client,
  ...models,
  DB_NAME
};