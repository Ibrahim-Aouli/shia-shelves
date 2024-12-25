import React from "react";
import styles from "./Products.module.css";

const AdminProducts = () => {
  return (
    <div className={styles.products}>
      <h1>Manage Products</h1>
      <p>Add, edit, and remove products in the inventory from this page.</p>
    </div>
  );
};

export default AdminProducts;
