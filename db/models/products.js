const client = require('../client');

async function createProduct({ productName, ingredients, calories, price }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      INSERT INTO products(productName, ingredients, calories, price)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (productName) DO NOTHING
      RETURNING *;
    `,
      [productName, ingredients, calories, price]
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByName({ productName }) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
      SELECT *
      FROM products
      WHERE productName='$1'
    `,
      [productName]
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
    const query = 'SELECT * FROM products';
    const { rows: products } = await client.query(query);
    console.log('DB ', products);

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByName,
  createProduct,
};
