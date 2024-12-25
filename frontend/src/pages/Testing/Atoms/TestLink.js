import React from "react";
import Heading from "../../../components/atoms/Heading/Heading";
import Link from "../../../components/atoms/Link/Link";

const TestLink = () => {
  return (
    <div>
      <Heading level={2}>Testing Link</Heading>
      <p>Test internal and external links with various styles.</p>

      {/* Internal Links */}
      <section>
        <Heading level={3}>Internal Links</Heading>
        <Link to="/home">Go to Home</Link>
        <Link to="/about">About Us</Link>
      </section>

      {/* External Links */}
      <section>
        <Heading level={3}>External Links</Heading>
        <Link to="https://www.google.com" external>
          Google
        </Link>
        <Link to="https://github.com" external>
          GitHub
        </Link>
      </section>
    </div>
  );
};

export default TestLink;
