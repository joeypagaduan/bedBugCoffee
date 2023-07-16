const express = require('express');


const router = express.Router();

const {
  addProducts,
  getProductByName,
  getProductById,
  getAllProducts,
  createProduct,
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
router.get('/', async (req, res, next) => {
  console.log('Products router');
  try {
    const products = await getAllProducts();
    console.log('API ', products);

    res.send({
      message: 'these are all the products',
      products: products,
    });
  } catch ({ name, message }) {
    res.send({ name, message });
  }
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
      inventory,
    });
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductById(req.params.productId);
  const { id, productName, price, ingredients, calories, inventory } = product;

  try {
    await destroyProduct(productId);
    res.send({
      id,
      productName,
      price,
      ingredients,
      calories,
      inventory,
    });
  } catch (error) {
    res.status(403).send(error);
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

// PATCH /api/products/:productsId

// router.patch('/:routineId', async (req, res, next) => {
//   const { isPublic, name, goal } = req.body;
//   const { routineId } = req.params;

//   if (!req.headers.authorization) {
//     res.send({
//       error: 'Error',
//       message: 'You must be logged in to perform this action',
//       name: 'Logged in error',
//     });
//   } else {
//     const rTest = await getRoutineById(routineId);
//     const user = jwt.decode(req.headers.authorization.replace('Bearer ', ''), {
//       complete: true,
//     });
//     if (rTest.creatorId != user.payload.id) {
//       res.status(403).send({
//         error: 'Error',
//         message: `User ${user.payload.username} is not allowed to update Every day`,
//         name: 'Logged in error',
//       });
//     }

//     const routine = await updateRoutine({
//       id: routineId,
//       isPublic,
//       name,
//       goal,
//     });

//     res.send(routine);
//   }
// });

// // DELETE /api/products/:routineId

// router.delete('/:routineId', async (req, res, next) => {
//   const { routineId } = req.params;

//   const rTest = await getRoutineById(routineId);
//   const user = jwt.decode(req.headers.authorization.replace('Bearer ', ''), {
//     complete: true,
//   });
//   if (rTest[0].creatorId != user.payload.id) {
//     res.status(403).send({
//       error: 'Error',
//       message: `User ${user.payload.username} is not allowed to delete On even days`,
//       name: 'Logged in error',
//     });
//   } else {
//     const routine = await getRoutineById(routineId);
//     const deleted = await destroyRoutine(routineId);

//     res.send(routine);
//   }
// });

// // POST /api/routines/:routineId/activities
// router.post('/:routineId/activities', async (req, res, next) => {
//   const { routineId } = req.params;
//   const { activityId } = req.body;

//   try {
//     const routines = await addActivityToRoutine(req.body);
//     res.send(routines);
//   } catch (error) {
//     res.send({
//       error: '',
//       message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
//       name: '',
//     });
//   }
// });

module.exports = router;
