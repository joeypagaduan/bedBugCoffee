const express = require('express');
const { createProduct, getAllProducts } = require('../db/models/products');
const router = express.Router();

const {
  addProducts,
  getProductByName,
  getProductById,
  getAllProducts,
} = require('../db/');

//POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const { productName, ingredients, price, calories, inventory } = req.body;

    const existingProduct = await getProductByName({ productName });

    if (!existingProduct) {
      return next({
        error: 'ProductError',
        message: 'Product ' + productName + ' is already added.',
        name: productName,
      });
    }

    const newProduct = await addProducts({
      productName,
      ingredients,
      price,
      calories,
      inventory,
    });

    res.send({
      message: 'You have added a new Product.',
      addedProduct: {
        id: newProduct.id,
        productName: newProduct.productName,
        ingredients: newProduct.ingredients,
        price: newProduct.price,
        calories: newProduct.calories,
        inventory: newProduct.inventory,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/products
router.get('/', async (req, res, next) => {
  console.log('Products router');
  try {
    const products = await getAllProducts();
    console.log('API ', products);

    res.send(products);
  } catch ({ name, message }) {
    res.send({ name, message });
  }
});

// POST /api/products
router.post('/', async (req, res, next) => {
  const { ingredients, name, price, calories } = req.body;
  const products = await createProduct({
    ingredients,
    name,
    price,
    calories,
  });

  res.send(products);
});

// //GET /api/products
// router.get('/', async (req, res, next) => {

//     try{
//         const {

//         } = req.body;

//         const products = await addProducts();
//         res.send({
//             message: "these are all the products",
//             products: products
//         });
//     }

//     catch (error) {
//         next(error);
//     }

// });

//GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.body;

    const product = await getProductById({ productId });

    if (!product) {
      return next({
        error: 'ProductError',
        message: 'Product  with the id of ' + productId + ' is not avalible.',
      });
    }

    res.send({
      message: 'this is the proudct with the id of ' + productId,
      products: product,
    });
  } catch (error) {
    next(error);
  }
});

//PATCH /api/products/:productId
router.patch('/:productId', async (req, res, next) => {});

//DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {});

module.exports = router;
