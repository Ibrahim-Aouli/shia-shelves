# Shia Shelves Backend

The backend is responsible for handling the business logic, data processing, and API services of the Shia Shelves platform. It is built using Node.js and Express, and integrates with MongoDB for data storage.

---

## Features

- RESTful API for frontend integration.
- Secure user authentication using JWT.
- Book search and filtering.
- Cart and order processing.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.x or later)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

---

## Setup Instructions

### 1. Navigate to the Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory with the following variables:
```plaintext
PORT=5000
MONGO_URI=mongodb://localhost:27017/shia-shelves
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server
```bash
npm start
```

For development with hot-reloading:
```bash
npm run dev
```

---

## API Endpoints

### Books
- `GET /books`: Fetch all books with optional filters.
- `GET /books/:id`: Fetch details of a specific book.

### Users
- `POST /register`: Register a new user.
- `POST /login`: Authenticate an existing user.

### Cart
- `POST /cart/add`: Add an item to the cart.
- `GET /cart`: Retrieve the user's cart.

### Orders
- `POST /order`: Place a new order.
- `GET /order/:id`: Retrieve details of an order.

---

## Project Structure

```plaintext
backend/
├── controllers/    # Request handling logic
├── models/         # MongoDB schemas
├── routes/         # API endpoint definitions
├── middleware/     # Custom middleware (e.g., authentication)
├── utils/          # Utility functions
├── config/         # Configuration files
├── server.js       # Entry point
└── .env            # Environment variables
```

---

## Development Scripts

- `npm start`: Start the backend server.
- `npm run dev`: Start the server with hot-reloading.

---

## Contribution Guidelines

- Follow RESTful API standards for new endpoints.
- Ensure all new features are unit tested.
- Document any new functionality added.

---

## License

This project is licensed under [MIT License](../LICENSE).