import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Icon from "../../atoms/Icon/Icon";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = "medium", 
  closeIcon = true 
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={`${styles.modal} ${styles[size]}`}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {closeIcon && (
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close Modal"
            >
              <Icon name="times" />
            </button>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  closeIcon: PropTypes.bool,
};

export default Modal;
