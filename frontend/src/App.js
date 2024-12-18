import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";

function App() {
  const [token, setToken] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/users" element={<UserList token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
