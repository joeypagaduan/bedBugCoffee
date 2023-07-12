import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function Carts() {
  return (
    <div>
      <h1>Cart: 123</h1>
      <Container>
        <Row>
          <Col sm={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td>Coffee 1</td>
                  <td>2</td>
                  <td>$1.30</td>
                  <td>Remove</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td></td>
                  <td>Coffee 2</td>
                  <td>1</td>
                  <td>$3.23</td>
                  <td>Remove</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col sm={2}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Discount: </td>
                </tr>
                <tr>
                  <td>Tax: </td>
                </tr>
                <tr>
                  <td>Shipping: </td>
                </tr>
                <tr>
                  <td>Total: </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Carts;
