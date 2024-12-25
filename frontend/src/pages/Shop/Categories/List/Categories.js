import React from "react";

const Categories = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shop by Categories</h1>
      <p>Explore our wide range of categories:</p>
      <ul>
        <li><a href="/shop/products?category=books">Books</a></li>
        <li><a href="/shop/products?category=gifts">Gifts</a></li>
        <li><a href="/shop/products?category=clothing">Clothing</a></li>
      </ul>
    </div>
  );
};

export default Categories;
