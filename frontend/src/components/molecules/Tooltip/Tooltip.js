import React from "react";
import PropTypes from "prop-types";
import styles from "./Tooltip.module.css";

const Tooltip = ({ content, position = "top", children }) => {
  return (
    <div className={styles.tooltipContainer}>
      {children}
      <span className={`${styles.tooltip} ${styles[position]}`}>{content}</span>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired, // The content displayed in the tooltip
  position: PropTypes.oneOf(["top", "right", "bottom", "left"]), // Tooltip position
  children: PropTypes.node.isRequired, // The element triggering the tooltip
};

export default Tooltip;
