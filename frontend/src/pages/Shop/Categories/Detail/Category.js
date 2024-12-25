import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryDetail = () => {
  const { categoryId } = useParams(); // Get the category ID from the URL.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulated API fetch for products in the category.
    // Replace this with a real API call.
    const fetchProducts = async () => {
      const fakeProducts = [
        { id: 1, name: "Book 1", price: 19.99 },
        { id: 2, name: "Book 2", price: 25.99 },
        { id: 3, name: "Book 3", price: 15.49 },
      ];
      setProducts(fakeProducts);
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Category: {categoryId}</h1>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: "1rem" }}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetail;
