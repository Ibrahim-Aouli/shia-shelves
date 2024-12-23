import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.module.css";

const Link = ({ to, children, external = false }) => {
  if (external) {
    return (
      <a href={to} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <RouterLink to={to} className={styles.link}>
      {children}
    </RouterLink>
  );
};

export default Link;
