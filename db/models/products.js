const client = require('../client');

async function getAllProducts(){
    try{
        const {rows} = await client.query(`
            SELECT * FROM products
            `);
            console.log(rows);
            return rows;

    }
    catch(error) {
        console.log(error);
        throw error;
    }

}

async function getProductById(id) {
    try {
      const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE id = $1;
        `, [id]
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
      .join(", ");
  
    try {
      if (setString.length > 0) {
        const { rows: [updatedProduct] } = await client.query(`
          UPDATE products
          SET ${setString}
          WHERE id = $${Object.keys(fields).length + 1}
          RETURNING *;
        `, [...Object.values(fields), id]);
  
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
        `DELETE FROM products
        WHERE id = $1;`
      , [id]);
  
      if (result.rowCount === 0) {
        throw new Error('Product not found');
      }
  
      console.log('Product successfully deleted');
    } catch (error) {
      console.error('Error while deleting product', error);
      throw error;
    }
;}


async function addProducts({ productName, ingredients, price, calories, inventory }) {
  try {
    console.log("Adding products ", productName)
    const { rows: [product] } = await client.query(
      `
      INSERT INTO products ("productName", ingredients, price, calories, inventory)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT ("productName") DO NOTHING
      RETURNING *;
      `,
      [productName, ingredients, price, calories, inventory]
    );
      console.log("Finished adding product!!!")

    return product;
  } catch (error) {
    // Handle any errors that occurred during the insertion process
    throw error;
  }
}


async function getProduct(productName){
  try {
      const { rows: [product] } = await client.query(
          `
              SELECT *
              FROM products
              WHERE "productName"=$1
          `, [productName]
      );

      return product;
  }

  catch (error) {
      throw error;
  }
}

// async function getAllProducts() {
//   try {
//       const { rows: [products] } = await client.query(
//           `
//               SELECT *
//               FROM products;
//           `
//       );

//       return products;
//   }

//   catch (error) {
//       throw error;
//   }
// }

module.exports = {
    getAllProducts,
    getProductById,
    destroyProduct,
    updateProduct,
    addProducts,
    getProduct,
    getAllProducts
};
