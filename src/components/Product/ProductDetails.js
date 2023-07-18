import React from "react";
import { useParams } from "react-router";

function ProductDetails(req) {
  const params = useParams();
  console.log("productId: ", params);

  return (
    <>
      <div className="cards">
        <div className="card1">
          <a href="#">
            <h2>Sell Online</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              nemo cumque odit. Nostrum, et ducimus?
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
