const client = require('./client');

async function addProducts(){
    try{
        const {row : [product]} = await client.query(
            `
                INSERT INTO products( productName, ingredients, price, calories, inventory )
                VALUES($1, $2, $3, $4, $5)
                ON CONFLICT (productName) DO NOTHING 
                RETURING *;
            `, [productName, ingredients, price, calories, inventory]
        );

        return product;
    }

    catch(error){
        throw error;
    }
}

async function getProductByName(productName){
    try {
        const { row: [product] } = await client.query(
            `
                SELECT *
                FROM products
                WHERE productName=$1
            `, [productName]
        );

        return product;
    }

    catch (error) {
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const { row: [product] } = await client.query(
            `
                SELECT *
                FROM products
                WHERE id=$1
            `, [productId]
        );

        return product;
    }

    catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { row: [products] } = await client.query(
            `
                SELECT *
                FROM products
            `
        );

        return products;
    }

    catch (error) {
        throw error;
    }
}

module.exports = {
    addProducts,
    getProductByName,
    getProductById,
    getAllProducts
}