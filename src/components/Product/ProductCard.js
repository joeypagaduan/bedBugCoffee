import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";

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
          name: product.name,
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
    <MDBCard className="mbody">
      <MDBCardImage src={product.imageUrl} position="top" alt="Laptop" />
      <MDBCardBody>
        <div className="d-flex justify-content-between">
          <p className="small">
            <a href="#!" className="text-muted">
              {product.name}
            </a>
          </p>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <h5 className="mb-0">Calories: {product.calories}</h5>
          <h5 className="text-dark mb-0">{product.price}</h5>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <p className="text-muted mb-0">
            Available: <span className="fw-bold">6</span>
          </p>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <p className="mb-0">
            <MDBTooltip
              tag="a"
              wrapperProps={{ href: "#" }}
              title={product.ingredients}
            >
              Ingredients
            </MDBTooltip>
          </p>
          <div className="ms-auto text-warning">
            <Button
              onClick={() => {
                handleAddToCartClick(product);
              }}
              variant="primary"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ProductCard;
