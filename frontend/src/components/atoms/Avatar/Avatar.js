import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Avatar.module.css";

const Avatar = ({
  src,
  alt = "Avatar",
  fallback = "", // Placeholder text or initials
  size = "medium",
  border = false,
  shadow = false,
  shape = "circle", // Default shape
  fit = "cover", // Default image fit
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true); // Trigger fallback behavior when image fails
  };

  const sizeClass = styles[size] || "";
  const shapeClass = styles[shape] || "";

  return (
    <div
      className={`${styles.avatarWrapper} ${sizeClass} ${shapeClass} ${
        border ? styles.border : ""
      } ${shadow ? styles.shadow : ""}`}
      aria-label={alt}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          className={styles.avatarImage}
          style={{ objectFit: fit }}
          onError={handleError} // Trigger fallback on error
        />
      ) : (
        <span className={`${styles.fallback} ${styles.greenBackground}`}>
          {fallback || ""}
        </span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "custom"]),
  border: PropTypes.bool,
  shadow: PropTypes.bool,
  shape: PropTypes.oneOf(["circle", "square", "rounded"]),
  fit: PropTypes.oneOf(["cover", "contain", "fill"]),
};

export default Avatar;
