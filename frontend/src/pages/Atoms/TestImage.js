import React from "react";
import Heading from "../../components/atoms/Heading/Heading";
import Image from "../../components/atoms/Image/Image";

const TestImage = () => {
  return (
    <div>
      <Heading level={2}>Testing Image</Heading>
      <p>Test different sizes, fit options, and loader states.</p>

      {/* Sizes */}
      <section>
        <Heading level={3}>Sizes</Heading>
        <Image src="https://via.placeholder.com/100" size="small" alt="Small Image" />
        <Image src="https://via.placeholder.com/200" size="medium" alt="Medium Image" />
        <Image src="https://via.placeholder.com/400" size="large" alt="Large Image" />
      </section>

      {/* Fit Options */}
      <section>
        <Heading level={3}>Fit Options</Heading>
        <Image src="https://via.placeholder.com/400x200" fit="cover" alt="Cover Fit" />
        <Image src="https://via.placeholder.com/200x400" fit="contain" alt="Contain Fit" />
      </section>
    </div>
  );
};

export default TestImage;
