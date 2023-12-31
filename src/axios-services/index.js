import axios from 'axios';
export const BASE_URI = process.env.CONTEXT==='production' || process.env.NODE_ENV==='production' ? 'https://bedbugcoffee.onrender.com' : 'http://localhost:4000';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

// export async function getUsers() {
//   try {
//     const { data: users } = await axios.get('/api/users')
//     return users;
//   } catch(err) {
//     console.error(err)
//   }
// }

export async function getProducts() {
  try {
    const { data } = await axios.get(
      `${BASE_URI}/api/products`
    );
    console.log(data.products);
    return data.products;
  } catch (err) {
    console.error(err);
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get(`${BASE_URI}/api/health`);
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}
