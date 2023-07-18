import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart({cart}) {
  const [cartItems, setCartItems] = useState(cart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading();
  }, []);

  const handleRemoveProduct = async (productId) => {
    try {
      // Update the cart first
      await fetch('http://localhost:4000/api/carts/remove', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({
          cartId: cart.id,
          prodId: productId,
          quantity: 0,
          totalprice: 0,
        }),
      });

      // Update the cart locally by removing the product from the cartItems state
      const updatedCart = cartItems.filter((item) => item.name !== productId);
      setCartItems(updatedCart);
    } catch (error) {
      setError('Failed to remove product from cart');
    }
  };

  const handleCheckout = () => {
    // Perform checkout logic here, e.g., redirect to a checkout page
    console.log('Checkout clicked');

    // Clear the cart
    setCartItems([]);

    // Display success message
    alert('You have successfully purchased the items.');

    // Redirect to the homepage
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted white">Cart</span>
      </h4>
      <ul className="list-group mb-3">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Product name</h6>
                  <small className="text-muted">{item.name}</small>
                </div>
                <span className="text-muted">${item.total}</span>
                <button onClick={() => handleRemoveProduct(item.name)}>Remove</button>
              </li>
            </div>
          ))
        ) : (
          <li className="list-group-item">Your cart is empty</li>
        )}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
