import React from "react";
import PropTypes from "prop-types";
import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ links, separator = "/", onClick }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {links.map((link, index) => (
        <span key={index} className={styles.breadcrumbItem}>
          {link.href ? (
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                onClick && onClick(link, index);
              }}
              className={styles.breadcrumbLink}
            >
              {link.label}
            </a>
          ) : (
            <span className={styles.breadcrumbText}>{link.label}</span>
          )}
          {index < links.length - 1 && (
            <span className={styles.separator}>{separator}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string, // If no href, it's plain text
    })
  ).isRequired,
  separator: PropTypes.string, // Character or icon between links
  onClick: PropTypes.func, // Callback for when a link is clicked
};

export default Breadcrumb;
