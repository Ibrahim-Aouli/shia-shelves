import React from "react";
import styles from "./Input.module.css";

const Input = ({ type = "text", size = "base", error = false, ...props }) => {
  const inputClass = `${styles.input} ${
    styles[size] || ""
  } ${error ? styles.error : ""}`;
  return <input type={type} className={inputClass} {...props} />;
};

export default Input;
