import React from "react";
import styles from "./Users.module.css";

const AdminUsers = () => {
  return (
    <div className={styles.users}>
      <h1>Manage Users</h1>
      <p>View and manage all users registered in the system.</p>
    </div>
  );
};

export default AdminUsers;
