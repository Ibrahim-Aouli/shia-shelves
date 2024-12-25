import React from "react";
import PropTypes from "prop-types";
import styles from "./Toggle.module.css";

const Toggle = ({ id, checked, onChange, label, size = "medium", disabled = false }) => {
  return (
    <div className={`${styles.toggleWrapper} ${styles[size]}`}>
      <input
        id={id}
        type="checkbox"
        className={styles.toggleInput}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id} className={`${styles.toggleLabel} ${disabled ? styles.disabled : ""}`}>
        <span className={styles.toggleSlider}></span>
        {label && <span className={styles.toggleText}>{label}</span>}
      </label>
    </div>
  );
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired, // ID for input and label linking
  checked: PropTypes.bool.isRequired, // Toggle state
  onChange: PropTypes.func.isRequired, // Change handler
  label: PropTypes.string, // Label text
  size: PropTypes.oneOf(["small", "medium", "large"]), // Toggle size
  disabled: PropTypes.bool, // Disable the toggle
};

export default Toggle;
