import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function Cart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        <Card.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.price}
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card.Body>
      </div>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default Cart;
