import React from 'react';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function ProductList(req) {
  const { type } = useParams();
  console.log('coffetype: ', type);

  return (
    <>
      <h1>{type !== undefined ? type.toUpperCase() : 'All Selections'}</h1>
      <Row xs={2} md={4} className="g-5">
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
        <Col>
          <ProductCard></ProductCard>
        </Col>
      </Row>
    </>
  );
}

export default ProductList;
