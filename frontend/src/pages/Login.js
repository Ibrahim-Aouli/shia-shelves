import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password }); // Debug input values
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      console.log("Login response:", response.data); // Debug successful response
      setToken(response.data.token);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error response:", error.response || error); // Debug error response
      alert("Invalid email or password.");
    }
  };
  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
