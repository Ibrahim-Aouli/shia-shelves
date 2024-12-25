import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Dropdown.module.css";

const Dropdown = ({ label, options, onSelect, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.dropdownToggle}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        {selected || placeholder}
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
              role="menuitem"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Dropdown;
