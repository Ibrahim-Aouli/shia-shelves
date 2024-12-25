import React from "react";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";
import Link from "../../atoms/Link/Link";
import Button from "../../atoms/Button/Button";
import Icon from "../../atoms/Icon/Icon";

const Navbar = ({ links, user, onLogin, onLogout }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoText}>
          MyApp
        </Link>
      </div>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.label} to={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.actions}>
        {user ? (
          <>
            <span className={styles.welcome}>Welcome, {user.name}!</span>
            <Button size="small" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button size="small" onClick={onLogin}>
            Login
          </Button>
        )}
        <Icon name="shopping-cart" size="1.5rem" />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
