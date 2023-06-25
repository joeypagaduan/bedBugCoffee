const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", async (req, res, next) => {});

// // ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// ROUTER: /api/orders
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

// ROUTER: /api/carts
const cartsRouter = require("./carts");
router.use("/carts", cartsRouter);

// ROUTER: /api/products
const productsRouter = require("./products");
router.use("/products", productsRouter);

router.get("*", function (req, res) {
  res.send("what???", 404);
});

module.exports = router;
