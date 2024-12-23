import React from "react";
import TestTemplate from "./TestTemplate";
import Avatar from "../../components/atoms/Avatar/Avatar";

const TestAvatar = () => {
  return (
    <TestTemplate title="Avatar">
      <Avatar
        src="https://via.placeholder.com/100"
        alt="Small Avatar"
        size="small"
      />
      <Avatar
        src="https://via.placeholder.com/150"
        alt="Medium Avatar"
        size="medium"
      />
      <Avatar
        src="https://via.placeholder.com/200"
        alt="Large Avatar"
        size="large"
      />
      <Avatar
        src="invalid-url"
        alt="Fallback Avatar"
        fallback="JD"
        size="large"
      />
    </TestTemplate>
  );
};

export default TestAvatar;
