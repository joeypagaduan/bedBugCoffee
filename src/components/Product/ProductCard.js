import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ product, setCart, cart }) {
  const handleAddToCartClick = (product) => {
    let newCart = cart;
    let index = newCart.entries.findIndex((prod) => prod.id == product.id);

    if (index != -1) {
      newCart.entries[index].quantity += 1;
      newCart.entries[index].total = Number(
        newCart.entries[index].quantity * newCart.entries[index].price
      );
    } else {
      newCart.entries = [
        ...newCart.entries,
        {
          id: product.id,
          price: Number(product.price),
          quantity: 1,
          total: Number(product.price),
        },
      ];
    }
    let totalV = newCart.entries
      .map((item) => item.total)
      .reduce((prev, next) => prev + next);
    setCart({ total: totalV, entries: [...newCart.entries] });
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Ingredients: {product.ingredients}</Card.Text>
        <Card.Text>Calories: {product.calories}</Card.Text>
        <Card.Text>Price: {product.price}</Card.Text>
        <Button
          onClick={() => {
            handleAddToCartClick(product);
          }}
          variant="primary"
        >
          Add to card
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
