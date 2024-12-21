// src/pages/Login/Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate successful login
      const token = "fake-jwt-token";
      const user = { email };
      login(token, user);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <Header />
      <main>
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
      </main>
      <Footer />
    </div>
  );
};

export default Login;
