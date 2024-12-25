import React from "react";
import styles from "./Orders.module.css";

const AdminOrders = () => {
  return (
    <div className={styles.orders}>
      <h1>Manage Orders</h1>
      <p>View and manage all customer orders from this page.</p>
    </div>
  );
};

export default AdminOrders;
