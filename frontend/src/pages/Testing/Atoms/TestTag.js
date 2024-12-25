import React from "react";
import Heading from "../../../components/atoms/Heading/Heading";
import Tag from "../../../components/atoms/Tag/Tag";

const TestTag = () => {
  return (
    <div>
      <Heading level={2}>Testing Tag</Heading>
      <p>Test tag styles, variants, and states.</p>

      {/* Variants */}
      <section>
        <Heading level={3}>Variants</Heading>
        <Tag variant="primary">Primary Tag</Tag>
        <Tag variant="secondary">Secondary Tag</Tag>
        <Tag variant="outline">Outline Tag</Tag>
      </section>

      {/* Sizes */}
      <section>
        <Heading level={3}>Sizes</Heading>
        <Tag size="small">Small Tag</Tag>
        <Tag size="medium">Medium Tag</Tag>
        <Tag size="large">Large Tag</Tag>
      </section>

      {/* With Icons */}
      <section>
        <Heading level={3}>With Icons</Heading>
        <Tag icon="check-circle" variant="primary">
          With Icon
        </Tag>
        <Tag icon="times-circle" variant="secondary">
          With Icon
        </Tag>
        <Tag icon="info-circle" variant="outline">
          Info Tag
        </Tag>
      </section>

      {/* Custom Colors */}
      <section>
        <Heading level={3}>Custom Colors</Heading>
        <Tag customColor="hsl(200, 70%, 50%)">Custom Blue</Tag>
        <Tag customColor="#FF5733">Custom Orange</Tag>
        <Tag customColor="rgb(123, 50, 200)">Custom Purple</Tag>
      </section>
    </div>
  );
};

export default TestTag;
