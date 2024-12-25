import React from "react";
import Avatar from "../../../components/atoms/Avatar/Avatar";

const TestAvatar = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "var(--font-family-primary)" }}>
      <h1>Avatar Component Showcase</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>Default Styles</h2>
        <Avatar />
        <Avatar src="https://via.placeholder.com/150" alt="Default Avatar" />
        <Avatar src="" fallback="JD" alt="Fallback Avatar" />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Sizes</h2>
        <Avatar src="https://via.placeholder.com/40" alt="Small Avatar" size="small" />
        <Avatar src="https://via.placeholder.com/80" alt="Medium Avatar" size="medium" />
        <Avatar src="https://via.placeholder.com/120" alt="Large Avatar" size="large" />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Shapes</h2>
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Circular Avatar"
          size="medium"
          shape="circle"
        />
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Square Avatar"
          size="medium"
          shape="square"
        />
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Rounded Avatar"
          size="medium"
          shape="rounded"
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>With Border</h2>
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Avatar with Border"
          size="medium"
          border
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>With Shadow</h2>
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Avatar with Shadow"
          size="medium"
          shadow
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Fallback Scenarios</h2>
        <p>No `src` provided:</p>
        <Avatar alt="No src" fallback="NS" />
        <p>Invalid `src`:</p>
        <Avatar src="https://invalid-url.com" alt="Invalid src" fallback="IU" />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Custom Background (Fallback)</h2>
        <Avatar
          src=""
          alt="Custom Fallback"
          fallback="CB"
          shape="circle"
          size="large"
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Fit Options</h2>
        <p>Cover:</p>
        <Avatar
          src="https://via.placeholder.com/150x100"
          alt="Cover Fit"
          size="large"
          fit="cover"
        />
        <p>Contain:</p>
        <Avatar
          src="https://via.placeholder.com/100x150"
          alt="Contain Fit"
          size="large"
          fit="contain"
        />
      </section>

      <section style={{ marginBottom: "30px" }}>
        <h2>Combination Styles</h2>
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Avatar with All Styles"
          size="large"
          border
          shadow
          shape="rounded"
        />
      </section>
    </div>
  );
};

export default TestAvatar;
