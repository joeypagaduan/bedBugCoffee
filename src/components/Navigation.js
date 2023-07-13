
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate, Link } from "react-router-dom";


function Navigation({ setToken, token }) {
  console.log(token)
  const navigate = useNavigate();
  

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('')
    navigate('/');
  };
 

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Bed Bug Coffee</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">All Selections</Nav.Link>
            </Nav>
            <Nav>
            
            {!token ? (
    <Nav.Link href="/login">Login</Nav.Link>
  ) : ( 
    <NavDropdown title="My Account" id="collasible-nav-dropdown">
      <NavDropdown.Item as={Link} to="/cart">Cart</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>
  )}
             </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
