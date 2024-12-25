import React, { useState } from "react";
import Modal from "../../../components/molecules/Modal/Modal";
import Button from "../../../../components/atoms/Button/Button";
import Heading from "../../../../components/atoms/Heading/Heading";

const TestModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div style={{ padding: "2rem" }}>
      <Heading level={1}>Modal Testing</Heading>

      <section>
        <Button onClick={handleOpen}>Open Modal</Button>
      </section>

      <Modal isOpen={isOpen} onClose={handleClose} title="Example Modal">
        <p>
          This is an example of a modal. You can customize its size, content,
          and behavior.
        </p>
        <Button onClick={handleClose}>Close</Button>
      </Modal>

      <section>
        <Heading level={2}>Different Sizes</Heading>
        <Button onClick={() => setIsOpen(true)}>Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Small Modal"
          size="small"
        >
          <p>This is a small modal.</p>
        </Modal>

        <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          title="Large Modal"
          size="large"
        >
          <p>This is a large modal.</p>
        </Modal>
      </section>
    </div>
  );
};

export default TestModal;
