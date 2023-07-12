import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({ product }) {
  const [buy, setBuy] = useState('');
  const [cart, setCart] = useState([]);

  const handleBuyClick = () => {
    setBuy('You bought this product!');
  };

  const handleAddToCartClick = () => {
    setCart([...cart, product]);
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
        {buy && <p>{buy}</p>}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
