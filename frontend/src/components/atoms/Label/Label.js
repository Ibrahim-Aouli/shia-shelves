import React from "react";
import styles from "./Label.module.css";

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  );
};

export default Label;
