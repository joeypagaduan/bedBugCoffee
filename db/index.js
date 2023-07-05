const models = require('./models');
const DB_NAME = 'bedBugCoffee';

module.exports = {
  ...models,
  DB_NAME,
  // ...require('./models/user'),
  // ...require('./models/products'),
  // //...require('./models/admin'),
};
