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



const App = () => {
  console.log('PAGE 1');
  const [APIHealth, setAPIHealth] = useState('');
  const [token, setToken] = useState('');

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

            <Route
              path="/sign-up"
              element={<Signup setToken={setToken} />}
            />

            <Route path="/login" element={<Login 
              Login={Login} setToken={setToken} token={token}
              />} />

            <Route path="/product/:id/:name" element={<ProductDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/:type" element={<ProductList />} />
            <Route path="/" element={<ProductList />} />
            


          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
