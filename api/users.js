const express = require("express");
const router = express.Router();
const { createUser } = require("../db/models/user");

// GET /api/routines
// POST /api/products
router.post("/", async (req, res, next) => {
  const { user } = req.body;
  const userResp = await createUser({
    username: user.username,
    password: user.password,
    email: user.email,
  });

  //replace logic here to user actual token
  userResp.token = "AHHOSAKjh1l2khg1l2jg412l!@!$12";
  console.log(userResp);
  res.send(userResp);
});

module.exports = router;
