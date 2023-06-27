const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// ROUTER: /api/orders
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

// ROUTER: /api/carts
const cartsRouter = require("./carts");
router.use("/carts", cartsRouter);

// ROUTER: /api/products
const activitiesRouter = require('./products');
router.use('/products', activitiesRouter);

module.exports = apiRouter;
