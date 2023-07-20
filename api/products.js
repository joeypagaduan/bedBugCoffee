const express = require('express');

const router = express.Router();

const {
  addProducts,
  getProductByName,
  getProductById,
  getAllProducts,
} = require('../db/models/products');

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
// router.get('/', async (req, res, next) => {
    
//     try{
//         const {
            
//         } = req.body;

//         const products = await getAllProducts();
//         res.send({
//             message: "these are all the products",
//             products: products
//         });
//     }

//     catch (error) {
//         next(error);
//     }

//     res.send(products);
//   });

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
// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const { productName, ingredients, price, calories, inventory } = req.query;

    // Add the new product to the database
    // await addProducts({ productName, ingredients, price, calories, inventory });
    console.log("Getting Products")
    // Retrieve all products
    const products = await getAllProducts();
    console.log("Finished Getting Products")

    // Send the response with the updated list of products
    res.send({
      message: "These are all the products",
      products: products
    });
  } catch (error) {
    next(error);
  }
});

// router.get('/', async (req, res, next) => {
//   console.log('Products router');
//   try {
//     const products = await getAllProducts();
//     console.log('API ', products);

//     res.send(products);
//   } catch ({ name, message }) {
//     res.send({ name, message });
//   }
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
router.patch('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { productName, price, ingredients, calories, inventory } = req.body;

    const product = await getProductById(productId);

    try {
        const updatedProduct = await updateProduct({
            productName,
            price,
            ingredients,
            calories,
            inventory
        });
        res.send(updatedProduct);
    } catch (error) {
      next (error);
    }
});

//DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const product = await getProductById(req.params.productId);
    const { id, productName, price, ingredients, calories, inventory } = product;

    try{
            await destroyProduct(productId);
            res.send({
                id,
                productName,
                price,
                ingredients,
                calories,
                inventory
            });
    } catch (error) {
        res.status(403).send(error);
    } 
});



module.exports = router;