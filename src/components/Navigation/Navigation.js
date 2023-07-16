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
          <Navbar.Brand>Bed Bug Coffee</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                All Selections
              </Nav.Link>
            </Nav>
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
            <NavDropdown title="Cart" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Stack gap={3}>
                  {cart.entries.length > 0
                    ? cart.entries.map((item) => {
                        return (
                          <>
                            <div className="p-2">
                              <Table striped bordered hover>
                                <tbody>
                                  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </>
                        );
                      })
                    : "Cart is empty!"}
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
