import React from "react";
import PropTypes from "prop-types";
import styles from "./Icon.module.css";

const Icon = ({ 
  name, 
  size = "1rem", 
  color = "black", 
  customColor = null, 
  customSvg = null, 
  alt = "" 
}) => {
  const computedColor = customColor || `var(--color-${color})`;

  return customSvg ? (
    <img
      src={customSvg}
      alt={alt || name}
      className={styles.icon}
      style={{
        width: size,
        height: size,
        fill: computedColor,
      }}
    />
  ) : (
    <i
      className={`fa fa-${name} ${styles.icon}`}
      style={{
        fontSize: size,
        color: computedColor,
      }}
      aria-hidden="true"
    ></i>
  );
};

Icon.propTypes = {
  name: PropTypes.string, // Font Awesome icon name
  size: PropTypes.string, // Size of the icon
  color: PropTypes.oneOf([
    "black", 
    "black-dark", 
    "black-light",
    "white",
    "white-dark",
    "grey",
    "grey-light",
    "grey-dark",
    "green",
    "green-light",
    "green-dark",
    "yellow",
    "yellow-light",
    "yellow-dark",
    "brown",
    "brown-light",
    "brown-dark",
    "red",
    "red-light",
    "red-dark"
  ]), // Predefined color options
  customColor: PropTypes.string, // Allows custom HEX, RGB, or HSL
  customSvg: PropTypes.string, // Optional: Path to custom SVG
  alt: PropTypes.string, // Accessibility label for custom SVG
};

export default Icon;
