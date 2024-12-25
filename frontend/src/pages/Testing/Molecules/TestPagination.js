import React, { useState } from "react";
import Pagination from "../../../components/molecules/Pagination/Pagination";
import Heading from "../../../components/atoms/Heading/Heading";

const TestPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Pagination Testing</Heading>
      <section>
        <Heading level={2}>Standard Pagination</Heading>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>

      <section>
        <Heading level={2}>Pagination with First/Last Buttons</Heading>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showFirstLast
        />
      </section>
    </div>
  );
};

export default TestPagination;
