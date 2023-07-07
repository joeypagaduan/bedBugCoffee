// require in the database adapter functions as you write them (createUser, createProduct...)
// const { } = require('./');
const client = require('./client');

const { createUser, createProduct } = require('./');

async function dropTables() {
  try {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order

    await client.query(`
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS admin;
    `);

    console.log('Finished dropping tables!');
  } catch (error) {
    console.error('Error while dropping tables!', error);

    throw error;
  }
}

async function createTables() {
  try {
    console.log('Starting to build tables...');

    // create all tables, in the correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );

      CREATE TABLE admin(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        productName VARCHAR(255) UNIQUE NOT NULL,
        ingredients TEXT NOT NULL,
        price DECIMAL(4, 2) NOT NULL,
        calories INTEGER NOT NULL,
        inventory INTEGER
      );
    `);
    console.log('Finished building tables!');
  } catch (error) {
    console.error('Error building tables!');

    throw error;
  }
}

/* 

SEED DATA

*/

async function createInitialUsers() {
  try {
    const usersToCreate = [
      {
        username: 'damylles',
        email: 'damylles@hello.edu',
        password: 'rose123',
      },
      { username: 'tuyen', email: 'tuyen@hello.edu', password: 'tran123' },
      {
        username: 'mirian',
        email: 'mirian@hello.edu',
        password: 'piniones123',
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialAdmin() {
  console.log('Starting to create administrators...');
  try {
    const adminToCreate = [
      {
        username: 'controller',
        email: 'admin@bedbugcafe.com',
        password: 'iControlAll',
      },
    ];
    const admin = await Promise.all(adminToCreate.map(createAdmin));

    console.log('Admin created:');
    console.log(admin);
    console.log('Finished creating administrators!');
  } catch (error) {
    console.error('Error creating administrators!');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create products...');

    const productsToCreate = [
      {
        productName: 'House Black',
        ingredients: 'Fresh ground arabica beans',
        price: '4.50',
        calories: '5',
        inventory: '10',
      },
      {
        productName: 'Latte',
        ingredients:
          'A shot of espresso and your choice of the type of steamed milk with a touch of foam',
        price: '6.50',
        calories: '190',
        inventory: '10',
      },
      {
        productName: 'Cappuccino',
        ingredients:
          'A shot of espresso, generous foam with a sprinkle of cocoa powder and cinnamon',
        price: '6.50',
        calories: '160',
        inventory: '10',
      },
      {
        productName: 'Americano',
        ingredients: 'Concentrated espresso shot, diluted in water',
        price: '5',
        calories: '18',
        inventory: '10',
      },
      {
        productName: 'Doppio',
        ingredients: 'A double shot of our special espresso',
        price: '5.50',
        calories: '10',
        inventory: '10',
      },
      {
        productName: 'Cortado',
        ingredients: 'The perfect balance of espresso and warm steamed milk',
        price: '5.50',
        calories: '15',
        inventory: '10',
      },
      {
        productName: 'Red Eye',
        ingredients: 'Our House Black with a shot of espresso mixed in',
        price: '6.50',
        calories: '8',
        inventory: '10',
      },
      {
        productName: 'Macchiato',
        ingredients:
          'Espresso, milk, and foam. The happy medium between a cappuccino and doppio',
        price: '7',
        calories: '206',
        inventory: '10',
      },
      {
        productName: 'Irish *must be 21 or older',
        ingredients:
          'Our House Black, whiskey, and sugar, topped with freshly whipped cream',
        price: '15',
        calories: '154',
        inventory: '10',
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('products created:');
    console.log(products);

    console.log('Finished creating products!');
  } catch (error) {
    console.error('Error creating products!');
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    //await createInitialAdmin();
  } catch (error) {
    console.log('Error during rebuildDB');
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,
  createInitialAdmin,
};
