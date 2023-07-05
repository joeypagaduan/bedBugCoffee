import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation({ token }) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Bad Bug Coffee</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">All Selections</Nav.Link>
              {/* <Nav.Link href="/arabica">Arabica</Nav.Link> */}
              {/* <Nav.Link href="/robusta">Robusta</Nav.Link> */}
            </Nav>
            <Nav>
              {!token && <Nav.Link href="/login">Login</Nav.Link>}
              {token && (
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                  <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
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
