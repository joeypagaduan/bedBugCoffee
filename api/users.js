/* eslint-disable no-useless-catch */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
} = require('../db/models/users');

const router = express.Router();

// POST /api/users/register

//export const registerAPI = async (username, email, password) => {
router.post("/register", async (req, res, next) => {
  const {username,password,email} = req.body;
  try {
    // Check if the username is already taken
    const existingUser = await getUserByUsername(username);
    
    if (existingUser) {
      next( {
        error: 'UserTakenError',
        message: `User ${username} is already taken.`,
        name: username,
      });
      return;
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      next( {
        error: 'PasswordTooShortError',
        message: 'Password is too short!',
        name: username,
      });
      return;
    }
    
    // Create a new user account
    const newUser = await createUser({ username, password, email });



    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      JWT_SECRET
    );

    
    res.send( {
      message: 'Thanks for signing up for our service.',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    })
  } catch (error) {
    next(error);
  }

});



// POST /api/users/login

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await getUserByUsername(username);

    if (!user) {
      // If the user doesn't exist, send an appropriate error response
      return next({
        message: 'Invalid username',
      });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      // If the password doesn't match, send an appropriate error response
      return next({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    // Return the response
    res.send({
      message: "you're logged in!",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
});


// GET /api/users/me
router.get('/me', async (req, res, next) => {
  try {
    // Get the current user based on the authentication token
    const currentUser = req.user;

    if (!currentUser) {
      return next({
        error: 'error',
        message: 'You must be logged in to perform this action',
        name: 'undefined',
      });
    }

    res.send({
      id: currentUser.id,
      username: currentUser.username,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;