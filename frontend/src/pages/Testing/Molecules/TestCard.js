import React from "react";
import Card from "../../components/molecules/Card/Card";
import Heading from "../../../components/atoms/Heading/Heading";
import Button from "../../../components/atoms/Button/Button";

const TestCard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Card Testing</Heading>

      {/* Basic Card */}
      <section>
        <Heading level={2}>Basic Card</Heading>
        <Card
          title="Card Title"
          description="This is a basic card with just a title and description."
        />
      </section>

      {/* Card with Image */}
      <section>
        <Heading level={2}>Card with Image</Heading>
        <Card
          image="https://via.placeholder.com/300x150"
          title="Card with Image"
          description="This card includes an image, title, and description."
        />
      </section>

      {/* Card with Actions */}
      <section>
        <Heading level={2}>Card with Actions</Heading>
        <Card
          title="Actionable Card"
          description="This card includes actions like buttons."
          actions={
            <>
              <Button size="small" onClick={() => alert("Clicked Save!")}>
                Save
              </Button>
              <Button size="small" variant="outline">
                Cancel
              </Button>
            </>
          }
        />
      </section>

      {/* Card with Footer */}
      <section>
        <Heading level={2}>Card with Footer</Heading>
        <Card
          title="Card with Footer"
          description="This card includes a footer for additional information."
          footer="Footer Text"
        />
      </section>
    </div>
  );
};

export default TestCard;
