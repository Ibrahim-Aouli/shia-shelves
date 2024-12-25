import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL.

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Product Details</h1>
      <div>
        <h2>Product Name (ID: {productId})</h2>
        <p>Product description goes here. It includes all details about the product.</p>
        <p><strong>Price:</strong> $99.99</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
