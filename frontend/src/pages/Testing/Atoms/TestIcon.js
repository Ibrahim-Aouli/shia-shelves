import React from "react";
import Heading from "../../../components/atoms/Heading/Heading";
import Icon from "../../../components/atoms/Icon/Icon";

const TestIcon = () => {
  return (
    <div>
      <Heading level={2}>Testing Icon</Heading>
      <p>Explore different icons, sizes, and customizations.</p>

      {/* FontAwesome Icons */}
      <section>
        <Heading level={3}>FontAwesome Icons</Heading>
        <Icon name="check-circle" size="2rem" color="green" />
        <Icon name="times-circle" size="2rem" color="red" />
        <Icon name="info-circle" size="2rem" color="blue" />
      </section>

      {/* Custom SVG */}
      <section>
        <Heading level={3}>Custom SVG Icons</Heading>
        <Icon
          customSvg="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          size="3rem"
          alt="React Logo"
        />
      </section>
    </div>
  );
};

export default TestIcon;
