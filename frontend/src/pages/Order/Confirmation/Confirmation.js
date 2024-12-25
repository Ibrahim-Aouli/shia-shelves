import React from "react";

const Confirmation = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase! Your order has been placed successfully.</p>
      <p>Order ID: <strong>#123456</strong></p>
      <button>Track Your Order</button>
    </div>
  );
};

export default Confirmation;
