import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ src, alt = "Avatar", fallback = "?", size = "medium" }) => {
  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <span className={styles.fallback}>{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
