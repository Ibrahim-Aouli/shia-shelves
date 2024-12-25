import React from "react";
import PropTypes from "prop-types";
import styles from "./TestTemplate.module.css";

const TestTemplate = ({ title, description, children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  );
};

TestTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TestTemplate;
