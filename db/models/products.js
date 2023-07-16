const client = require("../client");

async function createProduct({ name, ingredients, calories, price, imageUrl }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(name, ingredients, calories, price, "imageUrl")
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
      [name, ingredients, calories, price, imageUrl]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByName({ name }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE name='$1'
    `,
      [name]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(userId) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id=$1
    `,
      [userId]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  /* this adapter should fetch a list of products from your db */
  try {
    const query = "SELECT * FROM products";
    const { rows: products } = await client.query(query);
    console.log("DB ", products);

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByName,
  createProduct,
};
