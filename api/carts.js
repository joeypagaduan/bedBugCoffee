const express = require("express");

const {
  createCart,
  getUserCart,
  addProductToCart,
  updateCartProduct,
  cartProductCheck,
  removeProduct
} = require('../db/models/cart')

const router = express.Router();

// GET /api/routines
router.get("/", async (req, res, next) => {
  console.log("Carts router");
});


router.post('/shopping-cart', async (req, res, next) => {
  const { userId } = req.body

  try {
      const userCart = await getUserCart(userId);
      res.send(userCart);
  } catch (error) {
      next(error);
  }
})

router.post('/new-cart', async (req, res, next) => {
  const { userId } = req.body

  const basket = {
      userId: userId
  }

  try {
      const newCart = await createCart(basket)
      res.send(newCart);
  } catch (error) {
      next(error)
  }
})

router.post('/add-product', async (req, res, next) => {
  const {
    cartProductId,
    cartProductName,
    cartProductDescription,
    cartQuantity,
    cartProductPrice,
    cartTotalPrice,
    cartId
  } = req.body;

  const productInfo = {
    cartProductId,
    cartProductName,
    cartProductDescription,
    cartQuantity,
    cartProductPrice,
    cartTotalPrice,
    cartId
  };

  try {
      const pendingProduct = await cartProductCheck(cartId, prodId);

      if (pendingProduct) {
          pendingProduct.cartQuantity = pendingProduct.cartQuantity + 1;
          pendingProduct.cartTotalPrice = pendingProduct.cartQuantity * pendingProduct.cartProductPrice;

          const updatedProduct = await updateCartProduct(cartId, prodId, pendingProduct.cartQuantity, pendingProduct.cartTotalPrice)

          res.send(updatedProduct)
      } else {
          const addedProduct = await addProductToCart(productInfo);
          res.send(addedProduct);
      }

  } catch (error) {
      next(error);
  }
});

router.patch('/update', async (req, res, next) => {
  const { cartId, prodId, quantity, totalprice } = req.body;

  try {
      const updatedProduct = await updateCartProduct(cartId, prodId, quantity, totalprice)
      res.send(updatedProduct)
  } catch (error) {
      throw error;
  }

})

router.delete('/remove', async (req, res, next) => {
  const { prodId, cartId } = req.body

  try {
      const product = await removeProduct(cartId, prodId)
      res.send(`${prodId} removed from cart`)
  } catch (error) {
      next(error);
  }
})

module.exports = router;
