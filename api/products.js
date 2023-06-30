const express = require("express");
const router = express.Router();

const {
    addProducts,
    getProductByName,
    getProductById,
    getAllProducts
} = require("../db/");

//POST /api/products
router.post('/', async (req, res, next) => {
    try{
        const {
            productName,
            ingredients,
            price,
            calories,
            inventory
        } = req.body;
        
        const existingProduct = await getProductByName(productName);

        if (existingProduct) {
            return next({
                error: "ProductError",
                message: "Product " + productName + " is already added.",
                name: productName
            });
        }

        const newProduct = await addProducts({productName, ingredients, price, calories, inventory});

        res.send({
            message: "You have added a new Product.",
            user: {
                id: productName.id,
                productName: newProduct.productName,
                ingredients: newProduct.ingredients,
                price: newProduct.price,
                calories: newProduct.calories,
                inventory: newProduct.inventory
            },
        });
    }
    
    catch (error) {
        next(error);
    }

});

//GET /api/products
router.get('/', async (req, res, next) => {

});

//GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {

});

//PATCH /api/products/:productId
router.patch('/:productId', async (req, res, next) => {

});

//DELETE /api/products/:productId
router.delete('/:productId', async (req, re+s, next) => {

});



module.exports = router;