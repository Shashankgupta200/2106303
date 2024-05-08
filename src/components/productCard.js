
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Subtitle>{product.company}</Card.Subtitle>
        <Card.Text>Price: {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
