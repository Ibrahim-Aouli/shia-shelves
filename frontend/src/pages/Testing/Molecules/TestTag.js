import React, { useState } from "react";
import Tag from "../../../components/molecules/Tag/Tag";
import Heading from "../../../components/atoms/Heading/Heading";

const TestTag = () => {
  const [tags, setTags] = useState(["JavaScript", "React", "CSS"]);

  const handleRemove = (label) => {
    setTags(tags.filter((tag) => tag !== label));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Tag Testing</Heading>

      {/* Default Tag */}
      <section>
        <Heading level={2}>Default Tags</Heading>
        <Tag label="Default" />
        <Tag label="Closable" closable onClose={() => alert("Tag removed")} />
      </section>

      {/* Variants */}
      <section>
        <Heading level={2}>Variants</Heading>
        <Tag label="Success" variant="success" />
        <Tag label="Warning" variant="warning" />
        <Tag label="Danger" variant="danger" closable onClose={() => alert("Tag removed")} />
      </section>

      {/* Sizes */}
      <section>
        <Heading level={2}>Sizes</Heading>
        <Tag label="Small Tag" size="small" />
        <Tag label="Medium Tag" size="medium" />
        <Tag label="Large Tag" size="large" />
      </section>

      {/* Dynamic Tags */}
      <section>
        <Heading level={2}>Dynamic Tags</Heading>
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            closable
            onClose={() => handleRemove(tag)}
          />
        ))}
      </section>
    </div>
  );
};

export default TestTag;
