import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
