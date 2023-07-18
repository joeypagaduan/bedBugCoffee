import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import CardGroup from "react-bootstrap/CardGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";

import { getProducts } from "../../axios-services/index";

function ProductList({ setCart, cart }) {
  const { type } = useParams();

  const [products, setProducts] = useState([]);

  const productsList = async () => {
    const prod = await getProducts();
    setProducts(prod);
  };

  useEffect(() => {
    productsList();
  }, []);

  return (
    <>
      <MDBContainer fluid className="my-5">
        <MDBRow>
          {products &&
            products.map((product) => {
              return (
                <MDBCol
                  key={product.id}
                  md="12"
                  lg="4"
                  className="mb-4 mb-lg-0 cardColumn"
                >
                  <ProductCard
                    product={product}
                    setCart={setCart}
                    cart={cart}
                  ></ProductCard>
                </MDBCol>
              );
            })}
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default ProductList;
