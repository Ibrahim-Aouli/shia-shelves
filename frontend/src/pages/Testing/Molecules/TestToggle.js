import React, { useState } from "react";
import Toggle from "../../../components/molecules/Toggle/Toggle";
import Heading from "../../../../components/atoms/Heading/Heading";

const TestToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled(!isToggled);

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Toggle Testing</Heading>

      {/* Small Toggle */}
      <section>
        <Heading level={2}>Small Toggle</Heading>
        <Toggle
          id="small-toggle"
          size="small"
          checked={isToggled}
          onChange={handleToggle}
          label="Small Toggle"
        />
      </section>

      {/* Medium Toggle */}
      <section>
        <Heading level={2}>Medium Toggle</Heading>
        <Toggle
          id="medium-toggle"
          size="medium"
          checked={isToggled}
          onChange={handleToggle}
          label="Medium Toggle"
        />
      </section>

      {/* Large Toggle */}
      <section>
        <Heading level={2}>Large Toggle</Heading>
        <Toggle
          id="large-toggle"
          size="large"
          checked={isToggled}
          onChange={handleToggle}
          label="Large Toggle"
        />
      </section>

      {/* Disabled Toggle */}
      <section>
        <Heading level={2}>Disabled Toggle</Heading>
        <Toggle id="disabled-toggle" size="medium" checked={false} onChange={() => {}} disabled />
      </section>
    </div>
  );
};

export default TestToggle;
