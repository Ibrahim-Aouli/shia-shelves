import React from "react";
import Button from "../../../components/atoms/Button/Button";
import Heading from "../../../components/atoms/Heading/Heading";

const TestButton = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Button Testing</Heading>

      {/* Primary Buttons */}
      <section>
        <Heading level={2}>Primary Buttons</Heading>
        <Button onClick={() => alert("Primary Button Clicked")}>Primary</Button>
        <Button size="small">Small Primary</Button>
        <Button size="large">Large Primary</Button>
      </section>

      {/* Secondary Buttons */}
      <section>
        <Heading level={2}>Secondary Buttons</Heading>
        <Button
          variant="secondary"
          onClick={() => alert("Secondary Button Clicked")}
        >
          Secondary
        </Button>
        <Button variant="secondary" size="small">
          Small Secondary
        </Button>
        <Button variant="secondary" size="large">
          Large Secondary
        </Button>
      </section>

      {/* Outline Buttons */}
      <section>
        <Heading level={2}>Outline Buttons</Heading>
        <Button variant="outline">Outline</Button>
        <Button variant="outline" size="small">
          Small Outline
        </Button>
        <Button variant="outline" size="large">
          Large Outline
        </Button>
      </section>

      {/* Danger Buttons */}
      <section>
        <Heading level={2}>Danger Buttons</Heading>
        <Button variant="danger">Danger</Button>
        <Button variant="danger" size="small">
          Small Danger
        </Button>
        <Button variant="danger" size="large">
          Large Danger
        </Button>
      </section>

      {/* Full Width Button */}
      <section>
        <Heading level={2}>Full-Width Button</Heading>
        <Button fullWidth>Full Width Button</Button>
      </section>

      {/* Icon Buttons */}
      <section>
        <Heading level={2}>Icon Buttons</Heading>
        <Button icon="check-circle" variant="primary" iconPosition="left">Left Icon</Button>
        <Button icon="arrow-right" variant="primary" iconPosition="right">Right Icon</Button>
        <Button icon="search" variant="primary" iconPosition="left" size="large">
          Large Button with Icon
        </Button>
        <Button icon="user" variant="primary" aria-label="User Icon Button" />
      </section>

      {/* Shape Buttons */}
      <section>
        <Heading level={2}>Shape Buttons</Heading>
        <Button shape="rounded">Rounded Button</Button>
        <Button shape="pill">Pill Button</Button>
        <Button shape="square">Square Button</Button>
      </section>

      {/* Disabled Buttons */}
      <section>
        <Heading level={2}>Disabled Buttons</Heading>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </section>

      {/* Loading Buttons */}
      <section>
        <Heading level={2}>Loading Buttons</Heading>
        <Button loading>Loading</Button>
        <Button variant="secondary" loading>
          Loading Secondary
        </Button>
        <Button variant="outline" loading>
          Loading Outline
        </Button>
        <Button variant="danger" loading>
          Loading Danger
        </Button>
      </section>
    </div>
  );
};

export default TestButton;
