import React, { useState } from "react";
import Heading from "../../components/atoms/Heading/Heading";
import Loader from "../../components/atoms/Loader/Loader";
import Button from "../../components/atoms/Button/Button";

const TestLoader = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Heading level={2}>Testing Loader</Heading>
      <p>Experiment with the loader component.</p>

      <section>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? "Stop Loader" : "Start Loader"}
        </Button>
        {loading && <Loader />}
      </section>
    </div>
  );
};

export default TestLoader;
