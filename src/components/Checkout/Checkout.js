import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, authentication, setAuthentication }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    const result = await fetch(
      'http://localhost:4000/api/users/login',
      options
    );
    const response = await result.json();
    if (response.success) {
      console.log(response);
      setAuthentication({
        token: response.token,
        isLoggedIn: true,
        username: username,
      });
    } else {
      const error = response.message;
      console.log(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="checkout">
        <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted white">Your cart</span>
                </h4>
                <ul className="list-group mb-3">
                  {cart.entries.length > 0 &&
                    cart.entries.map((item) => {
                      return (
                        <div key={item.name}>
                          <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                              <h6 className="my-0">Product name</h6>
                              <small className="text-muted">{item.name}</small>
                            </div>
                            <span className="text-muted">${item.total}</span>
                          </li>
                        </div>
                      );
                    })}

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    {cart.total && <strong>${cart.total}</strong>}
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">Login</h4>
                {!authentication.isLoggedIn ? (
                  <form
                    id="formulario2"
                    className="needs-validation"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder=""
                          required
                          onChange={(event) => setUsername(event.target.value)}
                        />
                        <div className="invalid-feedback">
                          Valid username is required.
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder=""
                          required
                          onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="invalid-feedback">
                          Valid password is required.
                        </div>
                      </div>
                    </div>
                    <button type="submit">Login</button>
                  </form>
                ) : (
                  <div>User {authentication.username} logged in!</div>
                )}

                <hr className="mb-4" />
                <h4 className="mb-3">Billing address</h4>
                <form className="needs-validation">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder=""
                        value=""
                        required
                      />
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder=""
                        value=""
                        required
                      />
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      placeholder="Apartment or suite"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select d-block w-100"
                        id="country"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <select
                        className="form-select d-block w-100"
                        id="state"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>California</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">Zip code required.</div>
                    </div>
                  </div>
                  <hr className="mb-4" />

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-name" className="form-label">
                        Name on card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        placeholder=""
                        required
                      />
                      <small className="text-muted">
                        Full name as displayed on card
                      </small>
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-number" className="form-label">
                        Credit card number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Expiration date required
                      </div>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="cc-expiration" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        placeholder=""
                        required
                      />
                      <div className="invalid-feedback">
                        Security code required
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <button
                    className="btn btn-dark px-4 rounded-pill"
                    type="button"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Checkout;
