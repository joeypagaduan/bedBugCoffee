const client = require('../client');

async function createProduct({
  productName,
  ingredients,
  calories,
  price,
  imageUrl,
}) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `

      INSERT INTO products("productName", ingredients, calories, price, "imageUrl")
      VALUES($1, $2, $3, $4, $5)
      ON CONFLICT ("productName") DO NOTHING
      RETURNING *;
    `,
      [productName, ingredients, calories, price, imageUrl]
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

      WHERE "productName"='$1'
    `,
      [productName]
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

async function getProductById(prodId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * FROM products 
        WHERE prodId = $1;
        `,
      [prodId]
    );
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedProduct],
      } = await client.query(
        `
          UPDATE products
          SET ${setString}
          WHERE id = $${Object.keys(fields).length + 1}
          RETURNING *;
        `,
        [...Object.values(fields), id]
      );

      return updatedProduct;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function destroyProduct(id) {
  try {
    await client.query(
      `DELETE FROM routines
        WHERE id = $1;`,
      [id]
    );

    if (result.rowCount === 0) {
      throw new Error('Product not found');
    }

    console.log('Product successfully deleted');
  } catch (error) {
    console.error('Error while deleting product', error);

    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,

  destroyProduct,
  updateProduct,

  createProduct,
};
