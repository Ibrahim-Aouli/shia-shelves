import React from "react";
import Tooltip from "../../../components/molecules/Tooltip/Tooltip";
import Button from "../../../../components/atoms/Button/Button";
import Heading from "../../../../components/atoms/Heading/Heading";

const TestTooltip = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Tooltip Testing</Heading>

      <section>
        <Heading level={2}>Top Tooltip</Heading>
        <Tooltip content="This is a top tooltip" position="top">
          <Button>Hover me (Top)</Button>
        </Tooltip>
      </section>

      <section>
        <Heading level={2}>Right Tooltip</Heading>
        <Tooltip content="This is a right tooltip" position="right">
          <Button>Hover me (Right)</Button>
        </Tooltip>
      </section>

      <section>
        <Heading level={2}>Bottom Tooltip</Heading>
        <Tooltip content="This is a bottom tooltip" position="bottom">
          <Button>Hover me (Bottom)</Button>
        </Tooltip>
      </section>

      <section>
        <Heading level={2}>Left Tooltip</Heading>
        <Tooltip content="This is a left tooltip" position="left">
          <Button>Hover me (Left)</Button>
        </Tooltip>
      </section>
    </div>
  );
};

export default TestTooltip;
