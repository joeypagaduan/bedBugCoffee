import React, { useState } from 'react';
// import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';
// const express = require('express');


const Signup = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    if (password !== passwordConfirmation) {
      setError("Password and password confirmation don't match");
      return;
    }

    try {
    
      const response = await fetch('http://localhost:4000/api/users/register', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({username,email,password})
      })

      const info = await response.json();
      
      if (info.error === "A user by that username already exists") {
        setError('Username already exists. Please choose a different username.');
      } else if (info.token) {
        setToken(info.token);
       navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//           required
//           minLength={3}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="text"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//           required
//           minLength={3}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//           required
//           minLength={6}
//         />
//       </div>
//       <div>
//         <label htmlFor="passwordConfirmation">Confirm Password:</label>
//         <input
//           type="password"
//           id="passwordConfirmation"
//           value={passwordConfirmation}
//           onChange={(event) => setPasswordConfirmation(event.target.value)}
//           required
//           minLength={6}
//         />
//       </div>
//       <button type="submit">Sign-up</button>
//       {error && <p className="error-message">{error}</p>}
//     </form>
//   );
// };
return (
    <>
      <form id="formulario" onSubmit={handleSubmit}>
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
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>
        <label>
          <font color="white">Confirm Password</font>
          <input
            type="password"
            id="password"
            value={passwordConfirmation}
            placeholder="Confirm Password"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            required
            minLength={6}
          />
        </label>
        <button type="submit">Sign-up</button>
//       {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
};

export default Signup;
