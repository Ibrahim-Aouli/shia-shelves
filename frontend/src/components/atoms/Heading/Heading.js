import React from "react";
import PropTypes from "prop-types";
import styles from "./Heading.module.css";

const Heading = ({
  level = 1,
  children,
  align = "left",
  color = "black",
  transform = "capitalize",
}) => {
  const Tag = `h${level}`; // Dynamically assign heading level
  return (
    <Tag
      className={`${styles.heading} ${styles[`h${level}`]} ${styles[align]} ${styles[color]} ${
        styles[transform]
      }`}
    >
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]), // Restrict levels to valid headings
  align: PropTypes.oneOf(["left", "center", "right"]),
  color: PropTypes.oneOf(["black", "grey", "green", "brown", "white"]),
  transform: PropTypes.oneOf(["capitalize", "rawText", "upper"]),
  children: PropTypes.node.isRequired, // Ensure content is passed
};

export default Heading;
