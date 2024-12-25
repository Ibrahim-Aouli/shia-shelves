import React from "react";
import Heading from "../../../components/atoms/Heading/Heading";

const TestHeading = () => {
  return (
    <div>
      <Heading level={2}>Testing Heading</Heading>
      <p>Test different heading levels, alignments, and styles.</p>

      {/* Levels */}
      <section>
        <Heading level={3}>Heading Levels</Heading>
        <Heading level={1}>Level 1 Heading</Heading>
        <Heading level={2}>Level 2 Heading</Heading>
        <Heading level={3}>Level 3 Heading</Heading>
        <Heading level={4}>Level 4 Heading</Heading>
        <Heading level={5}>Level 5 Heading</Heading>
        <Heading level={6}>Level 6 Heading</Heading>
      </section>

      {/* Alignments */}
      <section>
        <Heading level={3}>Alignment Options</Heading>
        <Heading level={2} align="left">Left Aligned</Heading>
        <Heading level={2} align="center">Center Aligned</Heading>
        <Heading level={2} align="right">Right Aligned</Heading>
      </section>
    </div>
  );
};

export default TestHeading;
