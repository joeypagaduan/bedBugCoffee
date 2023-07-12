const express = require("express");
const router = express.Router();

// GET /api/routines
router.get("/", async (req, res, next) => {
  console.log("Carts router");
});

module.exports = router;
