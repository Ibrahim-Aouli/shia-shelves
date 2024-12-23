import React from "react";
import PropTypes from "prop-types";
import Label from "../Label/Label";
import styles from "./Checkbox.module.css";

const Checkbox = ({ id, checked, onChange, label, required = false }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkboxInput}
      />
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired, // ID for input and label linking
  checked: PropTypes.bool.isRequired, // Checkbox state
  onChange: PropTypes.func.isRequired, // Change handler
  label: PropTypes.string.isRequired, // Label text
  required: PropTypes.bool, // Indicate required field
};

export default Checkbox;
