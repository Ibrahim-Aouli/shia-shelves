import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/products";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Products</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
