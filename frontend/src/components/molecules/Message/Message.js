import React from "react";
import PropTypes from "prop-types";
import Icon from "../../atoms/Icon/Icon";
import styles from "./Message.module.css";

const Message = ({ type = "info", title, description, closable = false, onClose }) => {
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <div className={styles.icon}>
        <Icon
          name={
            type === "success"
              ? "check-circle"
              : type === "error"
              ? "times-circle"
              : type === "warning"
              ? "exclamation-circle"
              : "info-circle"
          }
        />
      </div>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {closable && (
        <button className={styles.closeButton} onClick={onClose} aria-label="Close Message">
          <Icon name="times" />
        </button>
      )}
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  title: PropTypes.string,
  description: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Message;
