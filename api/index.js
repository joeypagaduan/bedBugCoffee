const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

router.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
// const activitiesRouter = require('./products');
// router.use('/products', productsRouter);

module.exports = router;
