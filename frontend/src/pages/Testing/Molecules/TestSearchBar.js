import React, { useState } from "react";
import SearchBar from "../../../components/molecules/SearchBar/SearchBar";
import Heading from "../../../components/atoms/Heading/Heading";

const TestSearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${searchValue}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>SearchBar Testing</Heading>

      {/* Default Search Bar */}
      <section>
        <Heading level={2}>Default SearchBar</Heading>
        <SearchBar
          placeholder="Search something..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
        />
      </section>

      {/* Small Search Bar */}
      <section>
        <Heading level={2}>Small SearchBar</Heading>
        <SearchBar
          placeholder="Search small..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          size="small"
        />
      </section>

      {/* Large Search Bar */}
      <section>
        <Heading level={2}>Large SearchBar</Heading>
        <SearchBar
          placeholder="Search large..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          size="large"
        />
      </section>
    </div>
  );
};

export default TestSearchBar;
