import React from "react";

const Checkout = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>
      <p>Complete your purchase by filling out your details below.</p>
      <form>
        <label>
          Full Name:
          <input type="text" placeholder="Enter your full name" />
        </label>
        <label>
          Address:
          <input type="text" placeholder="Enter your address" />
        </label>
        <label>
          Payment Method:
          <select>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </label>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
