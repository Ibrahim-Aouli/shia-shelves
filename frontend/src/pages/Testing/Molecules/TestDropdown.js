import React, { useState } from "react";
import Dropdown from "../../../components/molecules/Dropdown/Dropdown";
import Heading from "../../../../components/atoms/Heading/Heading";

const TestDropdown = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option);
    alert(`You selected: ${option}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Dropdown Testing</Heading>

      {/* Basic Dropdown */}
      <section>
        <Heading level={2}>Basic Dropdown</Heading>
        <Dropdown
          label="Basic Dropdown"
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={handleSelect}
        />
      </section>

      {/* Pre-selected Value */}
      <section>
        <Heading level={2}>Dropdown with Pre-selected Value</Heading>
        <Dropdown
          label="Pre-selected Dropdown"
          options={["Apple", "Banana", "Cherry"]}
          onSelect={handleSelect}
          placeholder="Select a fruit"
        />
      </section>

      {/* Display Selected Value */}
      <section>
        <Heading level={2}>Selected Option</Heading>
        <p>Selected: {selectedOption || "None"}</p>
      </section>
    </div>
  );
};

export default TestDropdown;
