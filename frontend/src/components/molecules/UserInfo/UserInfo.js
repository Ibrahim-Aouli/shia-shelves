import React from "react";
import PropTypes from "prop-types";
import Avatar from "../../atoms/Avatar/Avatar";
import Heading from "../../atoms/Heading/Heading";
import styles from "./UserInfo.module.css";

const UserInfo = ({ avatarSrc, name, email, role, size = "medium", showRole = true }) => {
  return (
    <div className={styles.userInfoContainer}>
      <Avatar src={avatarSrc} alt={`${name}'s Avatar`} size={size} />
      <div className={styles.userInfoDetails}>
        <Heading level={3}>{name}</Heading>
        {email && <p className={styles.email}>{email}</p>}
        {showRole && role && <p className={styles.role}>{role}</p>}
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  avatarSrc: PropTypes.string.isRequired, // URL for the avatar
  name: PropTypes.string.isRequired, // User's name
  email: PropTypes.string, // User's email (optional)
  role: PropTypes.string, // User's role (optional)
  size: PropTypes.oneOf(["small", "medium", "large"]), // Avatar size
  showRole: PropTypes.bool, // Whether to display the user's role
};

export default UserInfo;
