const models = require('./models');
const DB_NAME = 'bedBugCoffee';

module.exports = {
  ...models,
  DB_NAME,
};
