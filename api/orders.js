const express = require('express');
const router = express.Router();

// GET /api/orders
router.get('/', async (req, res, next) => {
  console.log('Orders router');
  res.send({ orders: [] });
});

module.exports = router;
