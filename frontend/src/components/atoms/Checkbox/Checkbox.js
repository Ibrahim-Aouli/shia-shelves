import React from "react";
import PropTypes from "prop-types";
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

// Adding PropTypes for type validation
Checkbox.propTypes = {
  label: PropTypes.string, // Label for the checkbox
  checked: PropTypes.bool.isRequired, // Whether the checkbox is checked
  onChange: PropTypes.func.isRequired, // Change handler
  disabled: PropTypes.bool, // Whether the checkbox is disabled
};

export default Checkbox;
