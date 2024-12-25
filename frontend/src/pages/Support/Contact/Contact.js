import React from "react";

const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Email: support@shiashelves.com</p>
      <p>Phone: +61 400 123 456</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" placeholder="Your Name" />
        <label htmlFor="message">Message:</label>
        <textarea id="message" placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
