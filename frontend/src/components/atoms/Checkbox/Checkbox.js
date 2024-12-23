import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label, checked, onChange, disabled = false }) => {
  return (
    <label className={`${styles.checkboxLabel} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkboxInput}
      />
      <span className={styles.checkboxCustom}></span>
      {label && <span className={styles.checkboxText}>{label}</span>}
    </label>
  );
};

export default Checkbox;
