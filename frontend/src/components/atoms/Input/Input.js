import React from "react";
import PropTypes from "prop-types";
import Label from "../Label/Label";
import styles from "./Input.module.css";

const Input = ({
  id,
  type = "text",
  placeholder = "",
  defaultValue = "",
  onChange = () => {},
  size = "medium",
  variant = "outline",
  disabled = false,
  error = false,
  errorMessage = "",
  label,
  required = false,
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type={type}
        className={`${styles.input} ${styles[size]} ${styles[variant]} ${
          error ? styles.error : ""
        }`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={error}
      />
      {error && errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired, // ID for input and label linking
  type: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["outline", "filled", "underlined"]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string, // Label text
  required: PropTypes.bool, // Indicate required field
};

export default Input;
