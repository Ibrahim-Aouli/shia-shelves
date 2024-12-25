import React, { useState } from "react";
import Heading from "../../components/atoms/Heading/Heading";
import Textarea from "../../components/atoms/Textarea/Textarea";

const TestTextarea = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Heading level={2}>Testing Textarea</Heading>
      <p>Test textarea with different sizes, variants, and states.</p>

      {/* Sizes */}
      <section>
        <Heading level={3}>Sizes</Heading>
        <Textarea
          size="small"
          placeholder="Small Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
        <Textarea
          size="medium"
          placeholder="Medium Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
        <Textarea
          size="large"
          placeholder="Large Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      {/* Variants */}
      <section>
        <Heading level={3}>Variants</Heading>
        <Textarea
          variant="outline"
          placeholder="Outline Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
        <Textarea
          variant="filled"
          placeholder="Filled Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
        <Textarea
          variant="underlined"
          placeholder="Underlined Textarea"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      {/* Error State */}
      <section>
        <Heading level={3}>Error State</Heading>
        <Textarea
          placeholder="Invalid Textarea"
          error
          errorMessage="This field is required"
          onChange={(e) => setValue(e.target.value)}
        />
      </section>

      <section>
        <p>Textarea Value: {value}</p>
      </section>
    </div>
  );
};

export default TestTextarea;
