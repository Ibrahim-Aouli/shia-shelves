import React, { useState } from "react";
import Message from "../../../components/molecules/Message/Message";
import Heading from "../../../components/atoms/Heading/Heading";

const TestMessage = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Message Testing</Heading>

      {visible && (
        <section>
          <Heading level={2}>Success Message</Heading>
          <Message
            type="success"
            title="Success!"
            description="Your operation completed successfully."
            closable={true}
            onClose={handleClose}
          />
        </section>
      )}

      <section>
        <Heading level={2}>Error Message</Heading>
        <Message
          type="error"
          title="Error!"
          description="There was an issue processing your request."
        />
      </section>

      <section>
        <Heading level={2}>Warning Message</Heading>
        <Message
          type="warning"
          title="Warning!"
          description="This action could have unintended consequences."
        />
      </section>

      <section>
        <Heading level={2}>Info Message</Heading>
        <Message
          type="info"
          title="Information"
          description="Here's some useful information."
        />
      </section>
    </div>
  );
};

export default TestMessage;
