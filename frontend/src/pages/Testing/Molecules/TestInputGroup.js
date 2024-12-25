import React, { useState } from "react";
import InputGroup from "../../../components/molecules/InputGroup/InputGroup";
import Heading from "../../../components/atoms/Heading/Heading";
import Icon from "../../../components/atoms/Icon/Icon";

const TestInputGroup = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`Submitted: ${inputValue}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>InputGroup Testing</Heading>

      {/* Basic InputGroup */}
      <section>
        <Heading level={2}>Basic InputGroup</Heading>
        <InputGroup
          placeholder="Enter text"
          buttonLabel="Submit"
          onButtonClick={handleButtonClick}
        />
      </section>

      {/* InputGroup with Icon */}
      <section>
        <Heading level={2}>InputGroup with Icon</Heading>
        <InputGroup
          placeholder="Search here"
          buttonLabel="Search"
          icon={<Icon name="search" size="1rem" />}
          onButtonClick={handleButtonClick}
        />
      </section>

      {/* InputGroup with Label */}
      <section>
        <Heading level={2}>InputGroup with Label</Heading>
        <InputGroup
          label="Email Address"
          placeholder="Enter your email"
          buttonLabel="Sign Up"
          onButtonClick={handleButtonClick}
        />
      </section>

      {/* InputGroup Value Display */}
      <section>
        <Heading level={2}>Input Value</Heading>
        <p>Current Input: {inputValue || "None"}</p>
      </section>
    </div>
  );
};

export default TestInputGroup;
