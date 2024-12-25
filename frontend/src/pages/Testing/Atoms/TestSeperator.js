import React from "react";
import Heading from "../../../components/atoms/Heading/Heading";
import Divider from "../../../components/atoms/Divider/Divider";

const TestSeparator = () => {
  return (
    <div>
      <Heading level={2}>Testing Separator</Heading>
      <p>Experiment with separator styles, alignment, and labels.</p>

      {/* Basic Separators */}
      <section>
        <Heading level={3}>Basic Separators</Heading>
        <Divider styleType="solid" />
        <Divider styleType="dashed" />
        <Divider styleType="dotted" />
        <Divider styleType="none" />
      </section>

      {/* Labeled Separators */}
      <section>
        <Heading level={3}>Labeled Separators</Heading>
        <Divider label="Step 1" styleType="solid" />
        <Divider label="Step 2" styleType="dashed" alignment="center" />
        <Divider label="Step 3" styleType="dotted" alignment="right" />
      </section>

      {/* Custom Color */}
      <section>
        <Heading level={3}>Custom Colors</Heading>
        <Divider styleType="solid" color="green" />
        <Divider styleType="solid" color="brown" />
        <Divider styleType="solid" color="yellow" />
      </section>
    </div>
  );
};

export default TestSeparator;
