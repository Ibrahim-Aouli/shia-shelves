import React from "react";

const Settings = () => {
  return (
    <div>
      <h1>Account Settings</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" defaultValue="user@example.com" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Update your password" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;
