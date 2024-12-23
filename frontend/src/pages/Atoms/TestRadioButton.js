import React, { useState } from "react";
import Heading from "../../components/atoms/Heading/Heading";
import RadioButton from "../../components/atoms/RadioButton/RadioButton";

const TestRadioButton = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <div>
      <Heading level={2}>Testing Radio Button</Heading>
      <p>Test radio button configurations and group behavior.</p>

      {/* Radio Buttons */}
      <section>
        <Heading level={3}>Radio Group</Heading>
        <RadioButton
          name="test-radio"
          value="option1"
          checked={selected === "option1"}
          onChange={() => setSelected("option1")}
          label="Option 1"
        />
        <RadioButton
          name="test-radio"
          value="option2"
          checked={selected === "option2"}
          onChange={() => setSelected("option2")}
          label="Option 2"
        />
      </section>

      <section>
        <p>Selected Value: {selected}</p>
      </section>
    </div>
  );
};

export default TestRadioButton;
