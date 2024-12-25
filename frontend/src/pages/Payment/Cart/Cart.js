import React from "react";

const Cart = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Cart</h1>
      <p>Review the items in your cart before proceeding to checkout.</p>
      <div>
        {/* Example structure for cart items */}
        <div>
          <h3>Item Name</h3>
          <p>Price: $XX.XX</p>
          <p>Quantity: X</p>
        </div>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
