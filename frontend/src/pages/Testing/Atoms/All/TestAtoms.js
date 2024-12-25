import React, { useState } from "react";
import Avatar from "../../../../components/atoms/Avatar/Avatar";
import Button from "../../../../components/atoms/Button/Button";
import Input from "../../../../components/atoms/Input/Input";
import Label from "../../../../components/atoms/Label/Label";
import Checkbox from "../../../../components/atoms/Checkbox/Checkbox";
import RadioButton from "../../../../components/atoms/RadioButton/RadioButton";
import Icon from "../../../../components/atoms/Icon/Icon";
import Image from "../../../../components/atoms/Image/Image";
import Heading from "../../../../components/atoms/Heading/Heading";
import Divider from "../../../../components/atoms/Divider/Divider";
import Link from "../../../../components/atoms/Link/Link";
import Loader from "../../../../components/atoms/Loader/Loader";
import styles from "./TestAtoms.module.css";

const TestAtoms = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Heading level={1}>Testing Atoms</Heading>

      {/* Avatar */}
      <section>
        <h2>Avatar</h2>
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Placeholder Avatar"
          size="small"
        />
        <Avatar
          src="https://picsum.photos/200"
          alt="Random Avatar"
          size="medium"
        />
        <Avatar
          src="https://ui-avatars.com/api/?name=Jane+Doe&background=468A46&color=FFFFFF"
          alt="Jane Doe"
          size="large"
        />
        {/* Using Broken URL to Test Fallback */}
        <Avatar
          src="https://invalid-image-url.com"
          alt="Fallback Test"
          size="large"
          fallback="JD"
        />
      </section>

      {/* Buttons */}
      <section>
        <Heading level={2}>Button</Heading>
        <Button onClick={() => alert("Primary Button Clicked")}>
          {" "}
          Primary Button
        </Button>
        <Button
          variant="secondary"
          onClick={() => alert("Secondary Button Clicked")}
        >
          {" "}
          Secondary Button
        </Button>
        <Button
          variant="outline"
          onClick={() => alert("Outline Button Clicked")}
        >
          Outline Button
        </Button>
        <Button size="small">Small Button</Button>
        <Button size="large">Large Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button loading>Loading Button</Button>
        {/* Icon Buttons */}
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
      </section>

      {/* Checkbox */}
      <section>
        <Heading level={2}>Checkbox</Heading>
        <Checkbox label="Check me" />
        <Checkbox
          label="Disabled Checkbox"
          checked={false}
          onChange={() => {}}
          disabled={true}
        />
      </section>

      {/* Divider */}
      <section>
        <Heading level={2}>Divider</Heading>
        <Divider styleType="solid" />
        <Divider styleType="dashed" />
        <Divider styleType="dotted" />
        <Divider styleType="none" />
        <Divider withLabel label="OR" styleType="solid" alignment="left"/>
        <Divider withLabel label="OR" styleType="solid" alignment="center"/>
        <Divider withLabel label="OR" styleType="solid" alignment="right"/>
        <Divider withLabel label="Step 1" color="green" />
      </section>

      {/* Heading */}
      <section>
        <Heading level={1} align="right" transform="upper">
          Heading Level 1
        </Heading>
        <Heading level={2} align="center" transform="rawText">
          heading level 2
        </Heading>
        <Heading level={3} align="left">
          Heading Level 3
        </Heading>
        <Heading level={4}>Heading Level 4</Heading>
        <Heading level={5}>Heading Level 5</Heading>
        <Heading level={6}>Heading Level 6</Heading>
      </section>

      {/* Icon */}
      <section>
        <Heading level={2}>Icons</Heading>

        <Icon name="user" size="2rem" />
        <Icon name="check-circle" size="2rem" color="green" />
        <Icon name="times-circle" size="2rem" color="red" />
        <Icon name="info-circle" size="1.5rem" color="grey" />
        <Icon name="user" size="3rem" customColor="#ff5733" />
        <Icon name="search" size="2rem" customColor="rgb(0, 123, 255)" />
        <Icon
          customSvg="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          size="3rem"
          alt="React Logo"
        />
        <Icon customSvg="/path/to/icon.svg" size="2rem" alt="Custom SVG" />
      </section>

      {/* Image */}
      <section>
        <Heading level={2}>Image</Heading>
        <div className={styles.imageGrid}>
          <div>
            <Heading level={3}>Small</Heading>
            <Image
              src="https://via.placeholder.com/100"
              alt="Small Image"
              size="small"
            />
          </div>
          <div>
            <Heading level={3}>Medium</Heading>
            <Image
              src="https://via.placeholder.com/200"
              alt="Medium Image"
              size="medium"
            />
          </div>
          <div>
            <Heading level={3}>Large</Heading>
            <Image
              src="https://via.placeholder.com/400"
              alt="Large Image"
              size="large"
            />
          </div>
        </div>

        <div className={styles.imageGrid}>
          <div>
            <Heading level={3}>Cover</Heading>
            <Image
              src="https://via.placeholder.com/400x200"
              alt="Cover Image"
              fit="cover"
              size="medium"
            />
          </div>
          <div>
            <Heading level={3}>Contain</Heading>
            <Image
              src="https://via.placeholder.com/200x400"
              alt="Contain Image"
              fit="contain"
              size="medium"
            />
          </div>
          <div>
            <Heading level={3}>Fill</Heading>
            <Image
              src="https://via.placeholder.com/300x150"
              alt="Fill Image"
              fit="fill"
              customSize={{ width: "300px", height: "150px" }}
            />
          </div>
        </div>

        <div className={styles.fullDemo}>
          <Heading level={3}>Full Width</Heading>
          <Image
            src="https://via.placeholder.com/800x200"
            alt="Full Width Example"
            fit="fitWidth"
            size="fullWidth"
          />
          <Heading level={3}>Full Height</Heading>
          <Image
            src="https://via.placeholder.com/200x800"
            alt="Full Height Example"
            fit="fitHeight"
            size="fullHeight"
          />
        </div>

        <div className={styles.imageGrid}>
          <div>
            <Heading level={3}>Custom Size</Heading>
            <Image
              src="https://via.placeholder.com/150"
              alt="Custom Sized Image"
              customSize={{ width: "150px", height: "100px" }}
            />
          </div>
          <div>
            <Heading level={3}>With Border Radius</Heading>
            <Image
              src="https://via.placeholder.com/150"
              alt="Rounded Image"
              customSize={{ width: "150px", height: "150px" }}
            />
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section>
        <Heading level={2}>Inputs</Heading>

          <Input
            placeholder="Type something..."
            defaultValue="Prefilled Value"
          />
          <Input size="small" placeholder="Small Input" />
          <Input size="medium" placeholder="Medium Input" />
          <Input size="large" placeholder="Large Input" />
          <Input variant="outline" placeholder="Outline Input" />
          <Input variant="filled" placeholder="Filled Input" />
          <Input variant="underlined" placeholder="Underlined Input" />
          <Input
            placeholder="Invalid Input"
            error
            errorMessage="This field is required"
          />
          <Input placeholder="Can't type here" disabled />
          <Input type="text" placeholder="Text Input" />
          <Input type="password" placeholder="Password Input" />
          <Input type="email" placeholder="Email Input" />
          <Input type="number" placeholder="Number Input" />
      </section>

      {/* RadioButton */}
      <section>
        <Heading level={2}>Radio Buttons</Heading>
        <RadioButton
          name="test-radio"
          value="option1"
          checked={radioValue === "option1"}
          onChange={() => setRadioValue("option1")}
          label="Option 1"
        />
        <RadioButton
          name="test-radio"
          value="option2"
          checked={radioValue === "option2"}
          onChange={() => setRadioValue("option2")}
          label="Option 2"
        />
      </section>

      {/* Links */}
      <section>
        <Heading level={2}>Links</Heading>
        <Link to="/home">Internal Link</Link>
        <Link to="https://www.google.com" external>
          External Link
        </Link>
      </section>

      {/* Loader */}
      <section>
        <Heading level={2}>Loader</Heading>
        <Button onClick={() => setLoading(!loading)}>
          {loading ? "Hide Loader" : "Show Loader"}
        </Button>
        {loading && <Loader />}
      </section>
    </div>
  );
};

export default TestAtoms;
