import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TestAvatar from "../pages/Atoms/TestAvatar";
import TestButton from "../pages/Atoms/TestButton";
import TestCheckbox from "../pages/Atoms/TestCheckbox";
import TestDivider from "../pages/Atoms/TestDivider";
import TestHeading from "../pages/Atoms/TestHeading";
import TestIcon from "../pages/Atoms/TestIcon";
import TestImage from "../pages/Atoms/TestImage";
import TestInput from "../pages/Atoms/TestInput";
import TestLabel from "../pages/Atoms/TestLabel";
import TestLink from "../pages/Atoms/TestLink";
import TestLoader from "../pages/Atoms/TestLoader";
import TestRadioButton from "../pages/Atoms/TestRadioButton";
import TestSeperator from "../pages/Atoms/TestSeperator";
import TestTag from "../pages/Atoms/TestTag";
import TestTextArea from "../pages/Atoms/TestTextArea";

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
