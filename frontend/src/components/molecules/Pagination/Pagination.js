import React from "react";
import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
}) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      {showFirstLast && (
        <button
          className={styles.pageButton}
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          aria-label="First Page"
        >
          &laquo;
        </button>
      )}
      <button
        className={styles.pageButton}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        &lsaquo;
      </button>

      {[...Array(totalPages).keys()]
        .map((page) => page + 1)
        .map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        ))}

      <button
        className={styles.pageButton}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        &rsaquo;
      </button>
      {showFirstLast && (
        <button
          className={styles.pageButton}
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last Page"
        >
          &raquo;
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showFirstLast: PropTypes.bool,
};

export default Pagination;
