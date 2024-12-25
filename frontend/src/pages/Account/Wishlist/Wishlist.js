import React from "react";

const Wishlist = () => {
  return (
    <div>
      <h1>My Wishlist</h1>
      <p>Items you’ve added to your wishlist:</p>
      <ul>
        <li>Product 1 - <a href="/products/1">View</a></li>
        <li>Product 2 - <a href="/products/2">View</a></li>
      </ul>
    </div>
  );
};

export default Wishlist;
