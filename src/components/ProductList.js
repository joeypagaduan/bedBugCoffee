import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from './ProductCard';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { getProducts } from '../axios-services';

function ProductList({ setCart, cart, token }) {
  const { type } = useParams();

  const [products, setProducts] = useState([]);

  const productsList = async () => {
    const prod = await getProducts();
    console.log(prod);
    setProducts(prod);
  };

  useEffect(() => {
    productsList();
  }, []);

  return (
    <>
      <h1>{type !== undefined ? type.toUpperCase() : 'All Selections'}</h1>
      <Row xs={2} md={2} lg={3} className="g-10">
        {products &&
          products.map((product) => {
            return (
              <Col key={product.id}>
                    <ProductCard product={product} setCart={setCart} cart={cart} token={token}></ProductCard>
              </Col>
            );
          })}
      </Row>
    </>
  );
}

export default ProductList;
