import React from "react";
import Breadcrumb from "../../components/molecules/Breadcrumb/Breadcrumb";
import Heading from "../../components/atoms/Heading/Heading";

const TestBreadcrumb = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", href: "/products/laptops" },
    { label: "Gaming Laptop" },
  ];

  const handleBreadcrumbClick = (link, index) => {
    alert(`You clicked: ${link.label}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Breadcrumb Testing</Heading>
      <Breadcrumb links={links} separator=">" onClick={handleBreadcrumbClick} />
    </div>
  );
};

export default TestBreadcrumb;
