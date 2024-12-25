import React from "react";
import Heading from "../../components/atoms/Heading/Heading";
import Label from "../../components/atoms/Label/Label";

const TestLabel = () => {
  return (
    <div>
      <Heading level={2}>Testing Label</Heading>
      <p>Test label alignment, sizes, and associations with form controls.</p>

      {/* Labels with Inputs */}
      <section>
        <Heading level={3}>With Inputs</Heading>
        <Label htmlFor="input1" size="small">
          Small Label
        </Label>
        <input id="input1" type="text" />
        <Label htmlFor="input2" size="medium">
          Medium Label
        </Label>
        <input id="input2" type="text" />
        <Label htmlFor="input3" size="large">
          Large Label
        </Label>
        <input id="input3" type="text" />
      </section>

      {/* Standalone Labels */}
      <section>
        <Heading level={3}>Standalone Labels</Heading>
        <Label size="small">Standalone Small Label</Label>
        <Label size="medium">Standalone Medium Label</Label>
        <Label size="large">Standalone Large Label</Label>
      </section>
    </div>
  );
};

export default TestLabel;
