import React, { useState } from "react";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";
import Heading from "../../components/atoms/Heading/Heading";

const TestCheckbox = () => {
  const [checkedState, setCheckedState] = useState(false);
  const [indeterminateState, setIndeterminateState] = useState(false);

  const toggleIndeterminate = () => {
    setIndeterminateState(!indeterminateState);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Checkbox Testing</Heading>

      {/* Basic Checkboxes */}
      <section>
        <Heading level={2}>Basic Checkboxes</Heading>
        <Checkbox
          id="basic"
          checked={checkedState}
          onChange={(e) => setCheckedState(e.target.checked)}
          label="Basic Checkbox"
        />
        <Checkbox
          id="checked"
          checked={true}
          onChange={() => {}}
          label="Always Checked"
        />
        <Checkbox
          id="unchecked"
          checked={false}
          onChange={() => {}}
          label="Always Unchecked"
        />
      </section>

      {/* Disabled Checkboxes */}
      <section>
        <Heading level={2}>Disabled Checkboxes</Heading>
        <Checkbox
          id="disabled-checked"
          checked={true}
          onChange={() => {}}
          label="Disabled Checked"
          disabled
        />
        <Checkbox
          id="disabled-unchecked"
          checked={false}
          onChange={() => {}}
          label="Disabled Unchecked"
          disabled
        />
      </section>

      {/* Indeterminate State */}
      <section>
        <Heading level={2}>Indeterminate Checkbox</Heading>
        <Checkbox
          id="indeterminate"
          checked={indeterminateState}
          onChange={toggleIndeterminate}
          label="Indeterminate Checkbox"
          indeterminate
        />
        <button
          onClick={toggleIndeterminate}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            background: "#468A46",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Toggle Indeterminate State
        </button>
      </section>

      {/* Custom Colors */}
      <section>
        <Heading level={2}>Custom Colors</Heading>
        <Checkbox
          id="green"
          checked={true}
          onChange={() => {}}
          label="Green Checkbox"
          color="green"
        />
        <Checkbox
          id="red"
          checked={true}
          onChange={() => {}}
          label="Red Checkbox"
          color="red"
        />
        <Checkbox
          id="blue"
          checked={true}
          onChange={() => {}}
          label="Blue Checkbox"
          color="blue"
        />
        <Checkbox
          id="yellow"
          checked={true}
          onChange={() => {}}
          label="Yellow Checkbox"
          color="yellow"
        />
      </section>

      {/* Required Checkbox */}
      <section>
        <Heading level={2}>Required Checkbox</Heading>
        <Checkbox
          id="required"
          checked={checkedState}
          onChange={(e) => setCheckedState(e.target.checked)}
          label="Required Checkbox"
          required
        />
      </section>
    </div>
  );
};

export default TestCheckbox;
