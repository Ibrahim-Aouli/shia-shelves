import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestAvatar from "../pages/Testing/Atoms/TestAvatar";
import TestButton from "../pages/Testing/Atoms/TestButton";
import TestCheckbox from "../pages/Testing/Atoms/TestCheckbox";
import TestDivider from "../pages/Testing/Atoms/TestDivider";
import TestHeading from "../pages/Testing/Atoms/TestHeading";
import TestIcon from "../pages/Testing/Atoms/TestIcon";
import TestImage from "../pages/Testing/Atoms/TestImage";
import TestInput from "../pages/Testing/Atoms/TestInput";
import TestLabel from "../pages/Testing/Atoms/TestLabel";
import TestLink from "../pages/Testing/Atoms/TestLink";
import TestLoader from "../pages/Testing/Atoms/TestLoader";
import TestRadioButton from "../pages/Testing/Atoms/TestRadioButton";
import TestSeperator from "../pages/Testing/Atoms/TestSeperator";
import TestTag from "../pages/Testing/Atoms/TestTag";
import TestTextArea from "../pages/Testing/Atoms/TestTextArea";

const testPages = [
  { path: "avatar", component: TestAvatar, name: "Avatar" },
  { path: "button", component: TestButton, name: "Button" },
  { path: "checkbox", component: TestCheckbox, name: "Checkbox" },
  { path: "divider", component: TestDivider, name: "Divider" },
  { path: "heading", component: TestHeading, name: "Heading" },
  { path: "icon", component: TestIcon, name: "Icon" },
  { path: "image", component: TestImage, name: "Image" },
  { path: "input", component: TestInput, name: "Input" },
  { path: "label", component: TestLabel, name: "Label" },
  { path: "link", component: TestLink, name: "Link" },
  { path: "loader", component: TestLoader, name: "Loader" },
  { path: "radio-button", component: TestRadioButton, name: "Radio Button" },
  { path: "seperator", component: TestSeperator, name: "Separator" },
  { path: "tag", component: TestTag, name: "Tag" },
  { path: "textarea", component: TestTextArea, name: "Text Area" },
];

const TestRouter = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar for Navigation */}
        <nav style={{ width: "20%", padding: "1rem", borderRight: "1px solid #ccc" }}>
          <h2>Test Components</h2>
          <ul>
            <li>
              <Link to="/">All Components</Link>
            </li>
            {testPages.map(({ path, name }) => (
              <li key={path}>
                <Link to={`/${path}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content */}
        <main style={{ width: "80%", padding: "1rem" }}>
          <Routes>
            {testPages.map(({ path, component: Component }) => (
              <Route key={path} path={`/${path}`} element={<Component />} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default TestRouter;
