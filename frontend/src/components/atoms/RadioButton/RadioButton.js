import React from "react";
import styles from "./RadioButton.module.css";

const RadioButton = ({ name, value, checked, onChange, label }) => {
  return (
    <div className={styles.radio}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default RadioButton;
