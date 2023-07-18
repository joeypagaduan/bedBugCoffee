import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";

const Login = ({ setAuthentication, authentication }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username);

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

    const result = await fetch(
      "http://localhost:4000/api/users/login",
      options
    );
    const response = await result.json();
    console.log(response);
    if (response.success) {
      console.log(response);
      setAuthentication({
        token: response.token,
        isLoggedIn: true,
        username: username,
      });
      navigate("/");
    } else {
      const error = response.message;
      console.log(error);
      alert(error);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log("Navigate to Sign-up page!");
    navigate("/sign-up");
  };

  return (
    <>
      <form id="formulario" onSubmit={handleSubmit}>
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
