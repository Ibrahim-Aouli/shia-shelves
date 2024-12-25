// src/App.js
import React from "react";
import AppRouter from "./router/AppRouter";
import TestRouter from "./router/TestRouter";
const App = () => {
  return (
    <div className="App">
      {/* <TestRouter /> */}
      <AppRouter />
    </div>
  );
};

export default App;
