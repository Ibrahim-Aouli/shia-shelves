# Shia Shelves Database

The database is the core data storage for the Shia Shelves platform, handling books, users, and orders. It is built on **MongoDB** for flexibility and scalability.

---

## Features

- Centralized data storage for books, users, and orders.
- MongoDB schema for consistent and efficient data management.
- Support for filtering, searching, and CRUD operations.

---

## Prerequisites

Ensure you have the following installed:
- **MongoDB** (local instance or MongoDB Atlas for cloud storage)
- **Node.js** (for running database scripts)

---

## Setup Instructions

### 1. Install MongoDB
- Follow [MongoDB installation instructions](https://www.mongodb.com/docs/manual/installation/) for your operating system.
- Alternatively, create a MongoDB Atlas account for cloud storage.

### 2. Configure the Backend
- Update the `MONGO_URI` in the `backend/.env` file:
  ```plaintext
  MONGO_URI=mongodb://localhost:27017/shia-shelves
  ```
  Replace `localhost:27017` with your MongoDB Atlas connection string if using a cloud instance.

### 3. Seed the Database
- Navigate to the `database/` directory:
  ```bash
  cd database
  ```
- Run the `init.js` script to seed initial data:
  ```bash
  node init.js
  ```
  This script will populate the database with sample books, users, and orders.

---

## Database Schema

### 1. Books Collection
```json
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "price": "number",
  "stock": "number",
  "rating": "number",
  "description": "string",
  "imageUrl": "string"
}
```

### 2. Users Collection
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "address": {
    "street": "string",
    "city": "string",
    "zip": "string"
  },
  "orderHistory": [
    "orderId": "ObjectId"
  ]
}
```

### 3. Orders Collection
```json
{
  "userId": "ObjectId",
  "items": [
    {
      "bookId": "ObjectId",
      "quantity": "number"
    }
  ],
  "status": "string",
  "totalPrice": "number",
  "createdAt": "Date"
}
```

---

## Project Structure

```plaintext
database/
├── init.js         # Database seeding script
├── models/         # Mongoose schemas for MongoDB
└── README.md       # Documentation
```

---

## Development Notes

- Use **Mongoose** for schema validation and CRUD operations.
- Ensure the database connection is established before running backend APIs.
- Test database queries independently using tools like **MongoDB Compass** or **Postman**.

---

## Contribution Guidelines

- Define clear and concise schemas for new collections.
- Document any changes to the existing schemas.
- Use meaningful field names to ensure clarity.

---

## License

This project is licensed under [MIT License](../LICENSE).

