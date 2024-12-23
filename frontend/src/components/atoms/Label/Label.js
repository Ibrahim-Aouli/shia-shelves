import React from "react";
import PropTypes from "prop-types";
import styles from "./Label.module.css";

const Label = ({ htmlFor, children, size = "medium", color = "default", required = false }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${styles[size]} ${styles[color]}`}
    >
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired, // Links label to an input
  children: PropTypes.node.isRequired, // Label text/content
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["default", "grey", "green", "red"]),
  required: PropTypes.bool, // Show an asterisk for required fields
};

export default Label;
