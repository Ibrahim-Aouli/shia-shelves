import React, { useState } from "react";
import TestTemplate from "./TestTemplate";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";

const TestCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <TestTemplate title="Checkbox">
      <Checkbox
        label="Default Checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <Checkbox label="Disabled Checkbox" disabled />
      <Checkbox label="Pre-checked Checkbox" checked={true} disabled />
    </TestTemplate>
  );
};

export default TestCheckbox;
