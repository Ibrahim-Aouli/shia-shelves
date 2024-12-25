import React from "react";
import TestTemplate from "./TestTemplate";
import Divider from "../../../components/atoms/Divider/Divider";

const TestDivider = () => {
  return (
    <TestTemplate title="Divider">
      <Divider styleType="solid" />
      <Divider styleType="dashed" />
      <Divider styleType="dotted" />
      <Divider styleType="none" />
      <Divider label="OR" styleType="solid" alignment="center" />
      <Divider label="Step 1" color="green" />
    </TestTemplate>
  );
};

export default TestDivider;
