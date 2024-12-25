import React, { useState } from "react";
import Rating from "../../../components/molecules/Rating/Rating";
import Heading from "../../../components/atoms/Heading/Heading";

const TestRating = () => {
  const [rating, setRating] = useState(3);

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Rating Testing</Heading>

      {/* Default Rating */}
      <section>
        <Heading level={2}>Default Rating</Heading>
        <Rating value={rating} max={5} onChange={(value) => setRating(value)} />
      </section>

      {/* Custom Colors */}
      <section>
        <Heading level={2}>Custom Colors</Heading>
        <Rating value={rating} max={5} color="green" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} color="red" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} color="blue" onChange={(value) => setRating(value)} />
      </section>

      {/* Read-Only Rating */}
      <section>
        <Heading level={2}>Read-Only Rating</Heading>
        <Rating value={rating} max={5} readOnly />
      </section>

      {/* Different Icons */}
      <section>
        <Heading level={2}>Custom Icons</Heading>
        <Rating value={rating} max={5} icon="❤️" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} icon="🌟" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} icon="🔧" onChange={(value) => setRating(value)} />
      </section>

      {/* Different Sizes */}
      <section>
        <Heading level={2}>Different Sizes</Heading>
        <Rating value={rating} max={5} size="small" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} size="medium" onChange={(value) => setRating(value)} />
        <Rating value={rating} max={5} size="large" onChange={(value) => setRating(value)} />
      </section>
    </div>
  );
};

export default TestRating;
