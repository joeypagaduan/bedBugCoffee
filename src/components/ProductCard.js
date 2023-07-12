import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import { icons } from 'react-icons';

function ProductCard({ product, addToCart }) {
  const [buy, setBuy] = useState('');

  const handleAddToCartClick = () => {
    addToCart(product);
  };

  const handleBuyClick = () => {
    setBuy('You bought this product!');
  };

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Img
        variant="top"
        src="/images/Brown Simple Coffee Time Instagram Post.jpg"
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Ingredients: {product.ingredients}</Card.Text>
        <Card.Text>Calories: {product.calories}</Card.Text>
        <Card.Text>Price: {product.price}</Card.Text>

        <Button onClick={handleAddToCartClick} variant="primary">
          Add to cart
        </Button>
        <Button onClick={handleBuyClick} variant="success">
          Buy
        </Button>
        {buy && <p>{buy}</p>}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
