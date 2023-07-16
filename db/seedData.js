// require in the database adapter functions as you write them (createUser, createProduct...)
// const { } = require('./');

const client = require("./client");

const { createUser, createProduct } = require("./");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");

    // drop all tables, in the correct order

    await client.query(`
      DROP TABLE IF EXISTS order_entries;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_entries;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS users;

      DROP TABLE IF EXISTS addresses;
      DROP TABLE IF EXISTS products;

    `);

    console.log("Finished dropping tables!");
  } catch (error) {

    console.error("Error while dropping tables!", error);


    throw error;
  }
}

async function createTables() {
  try {

    console.log("Starting to build tables...");


    // create all tables, in the correct order
    await client.query(`
      CREATE TABLE addresses(
        id SERIAL PRIMARY KEY,
        line1 varchar(255) NOT NULL,
        line2 varchar(255) NOT NULL,
        town varchar(60) NOT NULL,
        state varchar(40) NOT NULL,
        country varchar(40) NOT NULL,
        postalcode varchar(12) NOT NULL
      );

      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE,
        email varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        "isAdmin" boolean NOT NULL,
        "customerAddress" INTEGER REFERENCES addresses(id)
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        productName VARCHAR(255) UNIQUE NOT NULL,
        ingredients TEXT NOT NULL,
        price DECIMAL(4, 2) NOT NULL,
        calories INTEGER NOT NULL,

        "imageUrl" varchar(255)
      );  

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        total DECIMAL(4, 2) NOT NULL,
        "totalTax" DECIMAL(4, 2) NOT NULL,
        "totalDiscount" DECIMAL(4, 2) NOT NULL,
        "anonymousEmail" varchar(255),
        "ccName" VARCHAR(255),
        "ccNumber" VARCHAR(255),
        "ccExpiration" VARCHAR(255),
        "ccCVC" VARCHAR(255),
        "customerAddress" INTEGER REFERENCES users(id),
        "anonymousAddress" INTEGER REFERENCES addresses(id)
      );

      CREATE TABLE order_entries(
        id SERIAL PRIMARY KEY,
        price DECIMAL(4, 2) NOT NULL,
        quantity INTEGER NOT NULL,
        "product" INTEGER REFERENCES products(id),
        "order" INTEGER REFERENCES orders(id)

      );
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");

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

        username: "damylles",
        email: "damylles@hello.edu",
        password: "rose123",
        isAdmin: "true",
      },
      {
        username: "tuyen",
        email: "tuyen@hello.edu",
        password: "tran123",
        isAdmin: "true",
      },
      {
        username: "mirian",
        email: "mirian@hello.edu",
        password: "piniones123",
        isAdmin: "true",
      },
      {
        username: "tuser",
        email: "tuser@tuser.edu",
        password: "test123",
        isAdmin: "false",

      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));


    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");

    throw error;
  }
}

async function createInitialProducts() {
  try {

    console.log("Starting to create products...");

    const productsToCreate = [
      {
        name: "House Black",
        ingredients: "Fresh ground arabica beans",
        price: "4.50",
        calories: "5",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Latte",
        ingredients:
          "A shot of espresso and your choice of the type of steamed milk with a touch of foam",
        price: "6.50",
        calories: "190",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Cappuccino",
        ingredients:
          "A shot of espresso, generous foam with a sprinkle of cocoa powder and cinnamon",
        price: "6.50",
        calories: "160",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Americano",
        ingredients: "Concentrated espresso shot, diluted in water",
        price: "5",
        calories: "18",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Doppio",
        ingredients: "A double shot of our special espresso",
        price: "5.50",
        calories: "10",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Cortado",
        ingredients: "The perfect balance of espresso and warm steamed milk",
        price: "5.50",
        calories: "15",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Red Eye",
        ingredients: "Our House Black with a shot of espresso mixed in",
        price: "6.50",
        calories: "8",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Macchiato",
        ingredients:
          "Espresso, milk, and foam. The happy medium between a cappuccino and doppio",
        price: "7",
        calories: "206",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',
      },
      {
        name: "Irish *must be 21 or older",
        ingredients:
          "Our House Black, whiskey, and sugar, topped with freshly whipped cream",
        price: "15",
        calories: "154",
        imageUrl: "/images/default_coffee_image.jpg",
        inventory: '10',

      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));


    console.log("products created:");
    console.log(products);

    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");

    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();

  } catch (error) {
    console.log("Error during rebuildDB");

    throw error;
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,


};
