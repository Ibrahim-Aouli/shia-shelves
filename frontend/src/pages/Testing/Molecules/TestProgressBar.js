import React, { useState } from "react";
import ProgressBar from "../../../components/molecules/ProgressBar/ProgressBar";
import Heading from "../../../components/atoms/Heading/Heading";
import Button from "../../../components/atoms/Button/Button";

const TestProgressBar = () => {
  const [progress, setProgress] = useState(50);

  const increaseProgress = () => {
    if (progress < 100) setProgress(progress + 10);
  };

  const decreaseProgress = () => {
    if (progress > 0) setProgress(progress - 10);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Progress Bar Testing</Heading>

      <section>
        <Heading level={2}>Default Progress Bar</Heading>
        <ProgressBar progress={progress} />
      </section>

      <section>
        <Heading level={2}>Striped Progress Bar</Heading>
        <ProgressBar progress={progress} striped />
      </section>

      <section>
        <Heading level={2}>Animated Progress Bar</Heading>
        <ProgressBar progress={progress} striped animated />
      </section>

      <section>
        <Heading level={2}>Colored Progress Bars</Heading>
        <ProgressBar progress={progress} color="green" label />
        <ProgressBar progress={progress} color="red" striped />
        <ProgressBar progress={progress} color="yellow" striped animated />
      </section>

      <section>
        <Heading level={2}>Interactive Progress Bar</Heading>
        <ProgressBar progress={progress} label />
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button onClick={increaseProgress} disabled={progress === 100}>
            Increase
          </Button>
          <Button onClick={decreaseProgress} disabled={progress === 0}>
            Decrease
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TestProgressBar;
