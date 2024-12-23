import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";
import Icon from "../Icon/Icon";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  shape = "pill",
  icon = null,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  loadingLabel = "Loading...",
}) => {
  return (
<button
  className={`${styles.button} ${styles[variant]} ${styles[size]} ${styles[shape]} ${
    fullWidth ? styles.fullWidth : ""
  } ${loading ? styles.loading : ""}`}
  onClick={onClick}
  disabled={disabled || loading}
  aria-busy={loading}
  aria-disabled={disabled}
>
  {loading ? (
    <div className={styles.loader}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  ) : (
    <>
      {icon && iconPosition === "left" && <Icon variant={variant} name={icon} size="1rem" />}
      {children}
      {icon && iconPosition === "right" && <Icon variant={variant} name={icon} size="1rem" />}
    </>
  )}
</button>

  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger", "success"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  shape: PropTypes.oneOf(["rounded", "pill", "square"]),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loadingLabel: PropTypes.string,
};

export default Button;
