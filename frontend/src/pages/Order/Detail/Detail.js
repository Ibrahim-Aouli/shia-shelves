import React from "react";

const Detail = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Order Details</h1>
      <p>Here are the details of your order:</p>
      <div>
        <h3>Item Name</h3>
        <p>Price: $XX.XX</p>
        <p>Quantity: X</p>
      </div>
      <p>Status: <strong>Processing</strong></p>
    </div>
  );
};

export default Detail;
