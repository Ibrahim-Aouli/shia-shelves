import React from "react";
import styles from "./Textarea.module.css";

const Textarea = ({ error = false, ...props }) => {
  const textareaClass = `${styles.textarea} ${error ? styles.error : ""}`;
  return <textarea className={textareaClass} {...props}></textarea>;
};

export default Textarea;
