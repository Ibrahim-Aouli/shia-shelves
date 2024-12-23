import React from "react";
import TestTemplate from "./TestTemplate";
import Button from "../../components/atoms/Button/Button";

const TestButton = () => {
  return (
    <TestTemplate title="Button">
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button size="small">Small Button</Button>
      <Button size="large">Large Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button loading>Loading Button</Button>
      <Button className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        Icon Button
      </Button>
      <Button className="icon icon-only">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </Button>
    </TestTemplate>
  );
};

export default TestButton;
