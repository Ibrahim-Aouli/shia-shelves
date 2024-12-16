# Shia Shelves

Shia Shelves is a platform designed to provide a seamless online experience for browsing, purchasing, and tracking Islamic books. This repository contains the complete implementation of the platform, including the frontend, backend, and database.

---

## Project Structure

```plaintext
shia-shelves/
├── frontend/      # Frontend code
├── backend/       # Backend code
├── database/      # Database scripts and configurations
└── README.md      # Project documentation
```

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.x or later)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**
- **Git**

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/shia-shelves.git
cd shia-shelves
```

### 2. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shia-shelves
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

### 4. Database Setup
1. Ensure MongoDB is installed and running locally or accessible through a cloud instance.
2. Use the `database/init.js` script to seed the database with initial data:
   ```bash
   cd database
   node init.js
   ```

---

## API Endpoints

### Backend API

#### Books
- `GET /books`: Fetch all books with optional filters.
- `GET /books/:id`: Fetch details of a specific book.

#### Users
- `POST /register`: Register a new user.
- `POST /login`: Authenticate a user.

#### Cart
- `POST /cart/add`: Add an item to the cart.
- `GET /cart`: Retrieve the user's cart.

#### Orders
- `POST /order`: Place a new order.
- `GET /order/:id`: Retrieve details of an order.

---

## Features

- **Frontend**: A responsive user interface for browsing books, managing a cart, and checking out.
- **Backend**: Secure RESTful APIs for user authentication, book management, and order processing.
- **Database**: MongoDB for flexible and scalable data storage.

---

## Development Scripts

### Frontend
- `npm start`: Start the development server.
- `npm build`: Build the production-ready application.

### Backend
- `npm start`: Start the backend server.
- `npm run dev`: Start the backend server with hot-reloading.

### Database
- `node init.js`: Seed the database with initial data.

---

## Contribution Guidelines

- Fork the repository.
- Create a feature branch and submit pull requests with detailed descriptions.
- Ensure consistent code formatting and documentation.

---

## License

This project is licensed under [MIT License](LICENSE).

