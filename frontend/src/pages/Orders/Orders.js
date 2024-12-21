import React, { useState, useEffect } from "react";
import { fetchOrders, createOrder } from "../../api/orders";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Orders = () => {
  const { auth } = React.useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(auth.token);
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders.");
      }
    };
    loadOrders();
  }, [auth.token]);

  const handleCreateOrder = async () => {
    const dummyOrder = {
      lineItems: [{ product: "PRODUCT_ID", quantity: 1 }],
      shippingAddress: { firstName: "John", lastName: "Doe", line1: "123 Main St" },
    };
    try {
      const newOrder = await createOrder(dummyOrder, auth.token);
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    } catch {
      setError("Failed to create order.");
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Your Orders</h1>
        {error && <p>{error}</p>}
        <button onClick={handleCreateOrder}>Create Dummy Order</button>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - {order.status}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
