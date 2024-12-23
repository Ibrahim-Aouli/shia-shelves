import React from "react";
import PropTypes from "prop-types";
import styles from "./Divider.module.css";

const Divider = ({ label, styleType = "solid", color = "grey-dark", alignment = "center" }) => {
  return (
    <div className={`${styles.container} ${styles[alignment]}`}>
      <hr className={`${styles.divider} ${styles[styleType]} ${styles[color]}`} />
      {label && <span className={styles.label}>{label}</span>}
      <hr className={`${styles.divider} ${styles[styleType]} ${styles[color]}`} />
    </div>
  );
};

Divider.propTypes = {
  label: PropTypes.string,
  styleType: PropTypes.oneOf(["solid", "dashed", "dotted"]),
  color: PropTypes.oneOf(["grey-dark", "grey", "green", "red", "black"]),
};

Divider.defaultProps = {
  label: "",
  styleType: "solid",
  color: "grey-dark",
  alignment: "center",
};

export default Divider;
