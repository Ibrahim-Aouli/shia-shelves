import React from "react";
import UserInfo from "../../../components/molecules/UserInfo/UserInfo";
import Heading from "../../../components/atoms/Heading/Heading";

const TestUserInfo = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>User Info Testing</Heading>

      <section>
        <Heading level={2}>Basic User Info</Heading>
        <UserInfo
          avatarSrc="https://via.placeholder.com/150"
          name="Jane Doe"
          email="jane.doe@example.com"
          role="Admin"
        />
      </section>

      <section>
        <Heading level={2}>User Info Without Role</Heading>
        <UserInfo
          avatarSrc="https://via.placeholder.com/150"
          name="John Smith"
          email="john.smith@example.com"
          showRole={false}
        />
      </section>

      <section>
        <Heading level={2}>Small User Info</Heading>
        <UserInfo
          avatarSrc="https://via.placeholder.com/150"
          name="Alice Johnson"
          size="small"
          role="Member"
        />
      </section>

      <section>
        <Heading level={2}>Large User Info</Heading>
        <UserInfo
          avatarSrc="https://via.placeholder.com/150"
          name="Robert Brown"
          size="large"
          email="robert.brown@example.com"
        />
      </section>
    </div>
  );
};

export default TestUserInfo;
