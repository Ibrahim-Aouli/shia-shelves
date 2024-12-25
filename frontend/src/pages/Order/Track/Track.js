import React from "react";

const Track = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Track Your Order</h1>
      <p>Enter your Order ID to see the status of your order:</p>
      <form>
        <label>
          Order ID:
          <input type="text" placeholder="Enter your Order ID" />
        </label>
        <button type="submit">Track</button>
      </form>
    </div>
  );
};

export default Track;
