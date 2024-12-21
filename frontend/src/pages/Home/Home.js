import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to Shia Shelves</h1>
          <p>Explore the finest Islamic books, gifts, and more.</p>
          <button>Shop Now</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
