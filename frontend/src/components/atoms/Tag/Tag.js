import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import styles from "./Tag.module.css";

const Tag = ({ children, variant = "primary", size = "medium", icon = null, customColor = null }) => {
  const customStyle = customColor ? { backgroundColor: customColor, color: "#fff" } : {};

  return (
    <div className={`${styles.tag} ${styles[variant]} ${styles[size]}`} style={customStyle}>
      {icon && <Icon name={icon} size="1rem" className={styles.icon} />}
      {children}
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.string,
  customColor: PropTypes.string,
};

export default Tag;
