import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ product, setCart, cart, token}) {
    const handleAddToCartClick = () => {
        setCart([[Object.entries(product)], ...cart]);
    };

    console.log("cart from product card: " + cart);

    return (
        <Card style={{ width: "20rem" }}>
            <Card.Img
                variant="top"
                src="/images/Brown Simple Coffee Time Instagram Post.jpg"
            />
            
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Ingredients: {product.ingredients}</Card.Text>
                <Card.Text>Calories: {product.calories}</Card.Text>
                <Card.Text>Price: {product.price}</Card.Text>
                {token &&
                    <Button onClick={handleAddToCartClick} variant="primary">
                        Add to cart
                    </Button>
                }
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
