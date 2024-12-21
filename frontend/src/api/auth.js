import axios from "axios";

const API_BASE = "http://localhost:5000";

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/user/login`, credentials);
    return response.data; // { token, userId, email }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Register
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE}/user/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  };
  