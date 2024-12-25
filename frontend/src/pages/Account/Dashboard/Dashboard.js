import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Account Dashboard</h1>
      <p>Welcome to your account dashboard. From here, you can access your orders, wishlist, and account settings.</p>
      <ul>
        <li><a href="/account/orders">View Orders</a></li>
        <li><a href="/account/wishlist">View Wishlist</a></li>
        <li><a href="/account/settings">Manage Account Settings</a></li>
      </ul>
    </div>
  );
};

export default Dashboard;
