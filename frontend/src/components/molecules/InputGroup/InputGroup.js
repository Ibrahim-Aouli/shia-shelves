import React from "react";
import PropTypes from "prop-types";
import styles from "./InputGroup.module.css";

const InputGroup = ({ label, placeholder, buttonLabel, onButtonClick, icon, onChange }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.wrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          onChange={onChange}
        />
        {buttonLabel && (
          <button className={styles.button} onClick={onButtonClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
  icon: PropTypes.node,
  onChange: PropTypes.func,
};

export default InputGroup;
