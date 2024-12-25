import React from "react";
import PropTypes from "prop-types";
import styles from "./Tag.module.css";

const Tag = ({
  label,
  variant = "default", // Default, success, warning, danger
  size = "medium", // small, medium, large
  onClick = null, // Optional click handler
  onClose = null, // Optional close handler
  closable = false,
}) => {
  return (
    <div
      className={`${styles.tag} ${styles[variant]} ${styles[size]} ${
        closable ? styles.closable : ""
      }`}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {closable && (
        <button
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) onClose();
          }}
          aria-label="Remove Tag"
        >
          &times;
        </button>
      )}
    </div>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired, // Text inside the tag
  variant: PropTypes.oneOf(["default", "success", "warning", "danger"]), // Tag style
  size: PropTypes.oneOf(["small", "medium", "large"]), // Tag size
  onClick: PropTypes.func, // Click handler
  onClose: PropTypes.func, // Close handler
  closable: PropTypes.bool, // If the tag can be closed
};

export default Tag;
