const client = require('../client');

const createCart = async ({ userId, sessionId, cartStatus }) => {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart ("userId")
            VALUES ($1)
            RETURNING *;
        `, [userId]);

        return cart;
    } catch (error) {
        console.error(error);
    }

}

const addProductToCart = async ({
    cartProductId,
    cartProductName,
    cartProductDescription,
    cartQuantity,
    cartProductPrice,
    cartTotalPrice,
    cartId
}) => {

    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart_item("cartProductId", "cartProductName", "cartProductDescription", "cartQuantity", "cartProductPrice", "cartTotalPrice", "cartId")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, [cartProductId,
            cartProductName,
            cartProductDescription,
            cartQuantity,
            cartProductPrice,
            cartTotalPrice,
            cartId])

        return cart;
    } catch (error) {
        console.error(error)
    }
};

const updateCartProduct = async (cartId, prodId, cartQuantity, cartTotalPrice) => {

    try {
        const { rows: [product] } = await client.query(`
            UPDATE cart_item
            SET "cartQuantity" = $1, "cartTotalPrice" = $2
            WHERE "cartId" = $3 and "cartProductId" = $4
            RETURNING *;
        `, [cartQuantity, cartTotalPrice, cartId, prodId]);

        return product;
    } catch (error) {
        throw error;
    }
}

const getUserCart = async (userId) => {
    try {
        const { rows: [userCart] } = await client.query(`
        select *
        from carts
        where "userId" = $1
        `, [userId])

        return userCart
    } catch (error) {
        throw error;
    }
}

const cartProductCheck = async (cartId, prodId) => {
    try {
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM cart_item
            WHERE "cartId" = $1
            AND "cartProductId" = $2;
        `, [cartId, prodId])

        return product;
    } catch (error) {
        throw error;
    }
}

const removeProduct = async (cartId, prodId) => {
    try {
        await client.query(`
            DELETE FROM cart_item
            WHERE "cartId" = $1 and "cartProductId" = $2
        `, [cartId, prodId])
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCart,
    getUserCart,
    addProductToCart,
    updateCartProduct,
    cartProductCheck,
    removeProduct
}