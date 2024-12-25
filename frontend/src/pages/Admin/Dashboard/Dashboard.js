import React from "react";
import styles from "./Dashboard.module.css";
import Heading from "../../../components/atoms/Heading/Heading";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Heading level={1}>Admin Dashboard</Heading>
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <h2>Total Orders</h2>
          <p>1234</p>
        </div>
        <div className={styles.statCard}>
          <h2>Total Revenue</h2>
          <p>$12,345</p>
        </div>
        <div className={styles.statCard}>
          <h2>Total Users</h2>
          <p>567</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
