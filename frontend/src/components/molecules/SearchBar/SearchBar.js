import React from "react";
import PropTypes from "prop-types";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import styles from "./SearchBar.module.css";

const SearchBar = ({ placeholder, value, onChange, onSearch, size = "medium" }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className={`${styles.searchBar} ${styles[size]}`}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        onKeyDown={handleKeyDown}
      />
      <Button size={size} onClick={onSearch}>
        Search
      </Button>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string, // Placeholder text for input
  value: PropTypes.string.isRequired, // Current value of the input
  onChange: PropTypes.func.isRequired, // Handler for input changes
  onSearch: PropTypes.func.isRequired, // Handler for search button or Enter key
  size: PropTypes.oneOf(["small", "medium", "large"]), // Size of the search bar
};

export default SearchBar;
