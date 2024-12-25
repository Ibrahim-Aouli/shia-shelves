import React, { useState } from "react";
import Heading from "../../../components/atoms/Heading/Heading";
import Input from "../../../components/atoms/Input/Input";

const TestInput = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Heading level={2}>Testing Input</Heading>
      <p>Test different input sizes, variants, and error states.</p>

      {/* Sizes */}
      <section>
        <Heading level={3}>Sizes</Heading>
        <Input
          size="small"
          placeholder="Small Input"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          size="medium"
          placeholder="Medium Input"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          size="large"
          placeholder="Large Input"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      {/* Variants */}
      <section>
        <Heading level={3}>Variants</Heading>
        <Input
          variant="outline"
          placeholder="Outline Variant"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          variant="filled"
          placeholder="Filled Variant"
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          variant="underlined"
          placeholder="Underlined Variant"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      {/* Error State */}
      <section>
        <Heading level={3}>Error State</Heading>
        <Input
          placeholder="Invalid Input"
          error
          errorMessage="This field is required"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>
    </div>
  );
};

export default TestInput;
