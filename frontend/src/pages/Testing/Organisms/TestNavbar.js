import React from "react";
import Navbar from "../../../components/organisms/Navbar/Navbar";
import Heading from "../../../components/atoms/Heading/Heading";

const TestNavbar = () => {
  const user = { name: "John Doe" };
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
  ];

  return (
    <div>
      <Heading level={1}>Navbar Testing</Heading>
      <Navbar
        links={links}
        user={user}
        onLogin={() => alert("Logging in...")}
        onLogout={() => alert("Logging out...")}
      />
    </div>
  );
};

export default TestNavbar;
