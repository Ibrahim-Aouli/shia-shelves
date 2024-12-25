// src/components/Layouts/MainLayout.js
import React from "react";
import Header from "../organisms/Header/Header";
import Footer from "../organisms/Footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
