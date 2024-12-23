import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        loading ? styles.loading : ""
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || children}
    >
      {loading ? (
        <span className={styles.loader}>Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
