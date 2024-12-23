import React from "react";
import styles from "./Divider.module.css";

const Divider = ({ label, styleType = "solid", color = "grey-dark" }) => {
  return (
    <div className={styles.container}>
      <hr className={`${styles.divider} ${styles[styleType]} ${styles[color]}`} />
      {label && <span className={styles.label}>{label}</span>}
      <hr className={`${styles.divider} ${styles[styleType]} ${styles[color]}`} />
    </div>
  );
};

export default Divider;
