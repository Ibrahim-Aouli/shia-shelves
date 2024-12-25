import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = ({ image, title, description, actions, footer }) => {
  return (
    <div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.cardImage} />}
      <div className={styles.cardContent}>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        {description && <p className={styles.cardDescription}>{description}</p>}
        {actions && <div className={styles.cardActions}>{actions}</div>}
      </div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.node, // Buttons or links as actions
  footer: PropTypes.node, // Footer content like metadata
};

export default Card;
