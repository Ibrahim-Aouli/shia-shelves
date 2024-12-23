import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../Loader/Loader";
import styles from "./Image.module.css";

const Image = ({
  src,
  alt = "Image",
  size = "auto",
  customSize = null,
  borderRadius = "none",
  shadow = false,
  lazy = false,
  fit = "cover",
  fallback = "https://via.placeholder.com/150",
  borderStyle = "none", // Options: solid, dashed, dotted
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const presetSizeStyles = styles[size] || "";
  const customSizeStyles = customSize
    ? { width: customSize.width, height: customSize.height }
    : null;

  return (
    <div
      className={`${styles.imageWrapper} ${presetSizeStyles} ${
        styles[`border-${borderStyle}`]
      } ${shadow ? styles.shadow : ""}`}
      style={{ borderRadius }}
    >
      {isLoading && !hasError && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}
      <img
        src={hasError ? fallback : src}
        alt={hasError ? "Fallback image" : alt}
        className={`${styles.image} ${styles[`fit-${fit}`]}`}
        style={customSizeStyles}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy ? "lazy" : "eager"}
      />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf([
    "auto",
    "small",
    "medium",
    "large",
    "fullWidth",
    "fullHeight",
  ]),
  customSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  borderRadius: PropTypes.string,
  shadow: PropTypes.bool,
  lazy: PropTypes.bool,
  fit: PropTypes.oneOf(["cover", "contain", "fill", "fitWidth", "fitHeight"]),
  fallback: PropTypes.string,
  borderStyle: PropTypes.oneOf(["none", "solid", "dashed", "dotted"]),
};

export default Image;
