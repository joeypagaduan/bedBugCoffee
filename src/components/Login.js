import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      user: {
        username: username,
        password: password,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    const result = await fetch(BASE_URL, options);
    const response = await result.json();
    if (response.success) {
      console.log(response);
      setAuthentication({ token: response.data.token, isLoggedIn: true });
      navigate("/");
    } else {
      const error = response.error;
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log("Navigate to Sign-up page!");
    navigate("/sign-up");
  };

  return (
    <>
      <form id="formulario">
        <label>
          <font color="white">Username:</font>
          <input
            type="text"
            id="name"
            value={username}
            placeholder="Name"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <font color="white">Password</font>
          <input
            type="password"
            id="password"
            // maxlength="8"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={(event) => handleSignup(event)}>
          Sign-up
        </button>
      </form>
    </>
  );
};

export default Login;
