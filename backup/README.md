# Shia Shelves Frontend

The frontend provides the user interface for browsing, searching, and purchasing books on the Shia Shelves platform. It is built using modern web technologies and designed to be responsive across devices.

---

## Features

- Responsive design for desktop and mobile.
- Book browsing with filtering and search functionality.
- User authentication and profile management.
- Shopping cart and checkout functionality.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.x or later)
- **npm** or **yarn**

---

## Setup Instructions

### 1. Navigate to the Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

This will start the application in development mode and open it in your default web browser.

---

## Available Scripts

- `npm start`: Start the development server.
- `npm build`: Build the application for production.
- `npm test`: Run tests.

---

## Project Structure

```plaintext
frontend/
├── public/         # Static files (e.g., index.html)
├── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Page-level components
│   ├── services/   # API interaction logic
│   ├── styles/     # Global and component-specific styles
│   ├── App.js      # Main application component
│   └── index.js    # Entry point
└── package.json    # Dependency management
```

---

## Pages

- **Homepage**: Highlights featured books and categories.
- **Gallery**: Displays books with filters and sorting options.
- **Book Details**: Detailed information about individual books.
- **Cart**: Manage selected books.
- **Checkout**: Enter payment and delivery information.
- **Profile**: Manage user information and view order history.

---

## Development Notes

- Use environment variables for configuration. Create a `.env` file in the `frontend/` directory if needed.
- Ensure API endpoints in the `services/` folder are correctly linked to the backend.

---

## Contribution Guidelines

- Use consistent styling and naming conventions.
- Document any new components added.
- Test all new functionality before merging.

---

## License

This project is licensed under [MIT License](../LICENSE).

