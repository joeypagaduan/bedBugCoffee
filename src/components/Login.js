import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";


const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 
   
    try {
    //   const response = await loginApi(username, password);
    const response = await fetch('http://localhost:4000/api/users/login', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({username,password})
      })
   
      const info = await response.json();
      
      if (info.token) {
        setToken(info.token);
        
        navigate('/')
          } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
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
      <button type="button" onClick={(event) => handleSignup(event)}> Sign-up </button>
            {error && <p className="error-message">{error}</p>} 
      </form>
      
    </>
  );
};

export default Login;