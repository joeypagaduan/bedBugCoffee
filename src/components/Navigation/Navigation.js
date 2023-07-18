import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";

function Navigation({ setAuthentication, authentication, cart }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthentication({
      token: undefined,
      isLoggedIn: false,
    });
    navigate("/");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>
              <img
                src="images/logo.png"
                style={{ width: 100, marginTop: -7 }}
              />
              Bad bug Coffee
            </Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {!authentication.isLoggedIn ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>

            <NavDropdown
              className="e-caret-hide"
              title={
                <div>
                  <span>Cart</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-cart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </span>
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <Stack gap={3}>
                  <div className="container">
                    <div className="shopping-cart">
                      <div className="shopping-cart-header">
                        <i className="fa fa-shopping-cart cart-icon"></i>
                        <span className="badge">3</span>
                        <div className="shopping-cart-total">
                          <span className="lighter-text">Total:</span>
                          <span className="main-color-text">{cart.total}</span>
                        </div>
                      </div>
                      <ul className="shopping-cart-items">
                        {cart.entries.length > 0
                          ? cart.entries.map((item) => {
                              return (
                                <div>
                                  <li className="clearfix">
                                    <span className="item-name">
                                      {item.name}
                                    </span>
                                    <span className="item-price">
                                      {item.price}
                                    </span>
                                    <span className="item-quantity">
                                      Quantity: {item.quantity}
                                    </span>
                                  </li>
                                </div>
                              );
                            })
                          : "Cart is empty!"}
                      </ul>
                      <div>
                        <Link to="/checkout">Checkout</Link>
                      </div>
                    </div>
                  </div>
                </Stack>
              </NavDropdown.Item>
            </NavDropdown>

            <span className="badge badge-warning" id="lblCartCount">
              {cart.entries.length > 0
                ? cart.entries
                    ?.map((item) => item.quantity)
                    ?.reduce((prev, next) => prev + next)
                : "0"}
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
