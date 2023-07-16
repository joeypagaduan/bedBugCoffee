// grab our db client connection to use with our adapters
<<<<<<< HEAD
const client = require('../client');
const bcrypt = require('bcrypt');

async function createUser({ username, password, email }) {
  console.log(`${username}, ${password}, ${email}`);

=======
const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser({ username, password, email, isAdmin }) {
  console.log(`${username}, ${password}, ${email}`);

>>>>>>> damylles-initial
  const SALT_COUNT = 5;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email, "isAdmin")
      VALUES($1, $2, $3, $4)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `,
      [username, hashedPassword, email, isAdmin]
    );

    delete user.password;
    user.success = true;
    return user;
  } catch (error) {
<<<<<<< HEAD
    console.log('Error creating user: ', error);
=======
    console.log("Error creating user: ", error);
>>>>>>> damylles-initial
    throw error;
  }
}

async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;

  const isValid = await bcrypt.compare(password, hashedPassword);

  if (isValid) {
    delete user.password;
    return user;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
    `,
      [userId]
    );

    delete user.password;

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const query = "SELECT * FROM users";
    const { rows } = await client.query(query);

    // Remove password field from each user object
    const users = rows.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
};
