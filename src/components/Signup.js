import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../axios-services';

const Signup = ({ setAuthentication }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const BASE_URL = 'http://localhost:4000/api/users/register';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      user: {
        username: username,
        password: password,
        email: email,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    const result = await fetch(BASE_URL, options);
    console.log(result);
    const response = await result.json();
    console.log(response);
    if (response.success) {
      console.log(response);
      setAuthentication({ token: response.token, isLoggedIn: true });
      navigate('/');
    } else {
      const error = response.error;
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log('Navigate to Sign-up page!');
    navigate('/sign-up');
  };

  return (
    <>
      <form id="formulario" onSubmit={(event) => handleSubmit(event)}>
        <label>
          <font color="white">Username:</font>
          <input
            type="text"
            id="name"
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          <font color="white">Email:</font>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
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
        <label>
          <font color="white">Confirm Password</font>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <button type="submit">Create user</button>
      </form>
    </>
  );
};

export default Signup;
