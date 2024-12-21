import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2024 Shia Shelves. All Rights Reserved.</p>
      </div>
      <div className="socials">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
