import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };
    return (
      <>
        <div>Login</div>

        <form>
          <div className="inputwrapper">
            <label htmlFor="name" className="newline">
              User
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="User"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <label htmlFor="pasword" className="newline">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input type="submit" value="Login" className="mybutton" />
          <input
            type="submit"
            value="Create Account"
            className="createaccount"
            onClick={(e) => {
              navigate('/createaccount');
            }}
          />
        </form>
      </>
    );
  };
}

export default Login;
