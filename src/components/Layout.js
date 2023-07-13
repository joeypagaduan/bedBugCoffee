import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { BsFillCartCheckFill } from "react-icons/bs";

//import { Outlet, Link, useNavigate } from "react-router-dom";

import React from "react";
import { Outlet } from "react-router-dom";

function Layout({setToken, token}) {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Navigation token={token} setToken={setToken} />
        </Row>
        <Row>
          <div className="content">
            <Outlet />
          </div>
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    </>
  );
}

export default Layout;
