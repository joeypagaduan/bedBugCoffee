import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function CreateAcount() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      user: {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation,
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
        <div>CreateAcount</div>;
        <div className="main">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
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

              <label htmlFor="passwordConfirmation" className="newline">
                Password Confirmation
              </label>
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                value={passwordConfirmation}
                placeholder="Password Confirmation"
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
              />
            </div>

            <input type="submit" value="Submit" className="mybutton" />
          </form>
        </div>
      </>
    );
  };
}

export default CreateAcount;
