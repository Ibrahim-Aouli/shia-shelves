import axios from "axios";

const API_BASE = "http://localhost:5000";

// Fetch all orders (admin-only)
export const fetchOrders = async (token) => {
  if (!token) {
    throw new Error("No authentication token provided.");
  }
  try {
    const response = await axios.get(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Fetch a single order by ID
export const fetchOrderById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Create a new order
export const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(`${API_BASE}/orders`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
