import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from './axios-services';
import './style/App.css';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateAccount from './components/CreateAccount';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Orders from './components/Orders';
import Cart from './components/Cart';



const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);


  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Layout token={token} setToken={setToken} />}>

                    <Route exact path="/sign-up" element={<Signup setToken={setToken} />}/>
                    <Route exact path="/login" element={<Login Login={Login} setToken={setToken} token={token}/>} />
                    <Route exact path="/product/:id/:name" element={<ProductDetails />} />
                    <Route exact path="/orders" element={<Orders />} />
                    <Route exact path="/cart" element={<Cart cart={cart}/>}/>
                    <Route exact path="/:type" element={<ProductList />} />
                    <Route exact path="/" element={<ProductList setCart={setCart} cart={cart} token={token} />} />
                
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
