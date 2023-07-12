const client = require('../client');

async function getAllProducts(){
    try{
        const {rows} = await client.query(`
            SELECT* FROM products
            `);
            return rows;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}

async function getProductById(prodId) {
    try {
      const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE prodId = $1;
        `, [prodId]
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
    }
  
  }
  
  async function destroyProduct(id) {
    try {
        await client.query(
        `DELETE FROM routines
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

module.exports = {
    getAllProducts,
    getProductById,
    destroyProduct,
    updateProduct
};
