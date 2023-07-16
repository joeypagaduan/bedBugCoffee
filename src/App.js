import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "./axios-services";
import "./style/App.css";
import Layout from "./components/Layout/Layout";
import ProductList from "./components/Product/ProductList";
import Login from "./components/MyAccount/Login";
import Signup from "./components/MyAccount/Signup";
import CreateAccount from "./components/MyAccount/CreateAccount";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import Orders from "./components/MyAccount/Orders";

function usePersistedState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [authentication, setAuthentication] = usePersistedState(
    {},
    "authentication"
  );

  const [cart, setCart] = usePersistedState({ total: 0, entries: [] }, "cart");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, [cart]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                setAuthentication={setAuthentication}
                authentication={authentication}
                cart={cart}
              />
            }
          >
            <Route
              path="/sign-up"
              element={
                <Signup
                  setAuthentication={setAuthentication}
                  authentication={authentication}
                />
              }
            />
            <Route
              path="createAcount"
              element={
                <CreateAccount
                  setAuthentication={setAuthentication}
                  authentication={authentication}
                />
              }
            />
            <Route
              path="login"
              element={
                <Login
                  setAuthentication={setAuthentication}
                  authentication={authentication}
                />
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/:type"
              element={<ProductList setCart={setCart} cart={cart} />}
            />
            <Route
              path="/orders"
              element={<Orders authentication={authentication} />}
            />
            <Route
              path="/"
              element={<ProductList setCart={setCart} cart={cart} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
