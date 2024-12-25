import React from "react";
import PropTypes from "prop-types";
import styles from "./Rating.module.css";

const Rating = ({
  value,
  max = 5,
  size = "medium",
  onChange = null,
  color = "yellow",
  readOnly = false,
  icon = "★",
}) => {
  const handleClick = (rating) => {
    if (onChange && !readOnly) onChange(rating);
  };

  return (
    <div
      className={styles.ratingWrapper}
      role={!readOnly ? "slider" : "img"}
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax={max}
    >
      {[...Array(max)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={index}
            className={`${styles.icon} ${ratingValue <= value ? styles.active : ""} ${
              readOnly ? styles.readOnly : ""
            }`}
            style={{ fontSize: `var(--font-size-${size})`, color: ratingValue <= value ? `var(--color-${color})` : "var(--color-grey-light)" }}
            onClick={() => handleClick(ratingValue)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick(ratingValue);
            }}
            tabIndex={!readOnly ? 0 : -1}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired, // Current rating value
  max: PropTypes.number, // Maximum rating value
  size: PropTypes.oneOf(["small", "medium", "large"]), // Size of the stars
  onChange: PropTypes.func, // Callback function when a rating is selected
  color: PropTypes.oneOf(["yellow", "green", "red", "blue", "grey"]), // Active star color
  readOnly: PropTypes.bool, // Whether the rating is read-only
  icon: PropTypes.string, // Icon to use for the rating (default is star)
};

export default Rating;
