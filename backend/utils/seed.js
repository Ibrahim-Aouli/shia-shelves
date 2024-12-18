require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const { Product, Book } = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/shia-shelves");
    console.log("MongoDB connected...");

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    console.log("Existing data cleared.");

    // 1. Seed Books
    const sampleBooks = [
      {
        productType: "Book",
        name: "Nahj al-Balagha",
        description: "A collection of sermons, letters, and narrations attributed to Imam Ali (AS).",
        price: 19.99,
        sku: "NB001",
        brand: "Shia Publishers",
        category: "Religion",
        tags: ["Islam", "Shia", "Hadith", "Sermons"],
        stock: 50,
        dimensions: { width: 15, height: 20, depth: 3 },
        weight: 500,
        authors: ["Imam Ali (AS)"],
        ISBN: "1234567890",
        publisher: "Shia Publishers",
        publicationYear: 2020,
        language: "Arabic/English",
        pages: 400,
        format: "Hardcover",
        subject: "Islamic Theology",
      },
      {
        productType: "Book",
        name: "Al-Kafi",
        description: "A fundamental collection of Shia Hadith.",
        price: 29.99,
        sku: "AK001",
        brand: "Shia Publishers",
        category: "Religion",
        tags: ["Islam", "Shia", "Hadith"],
        stock: 30,
        dimensions: { width: 15, height: 22, depth: 4 },
        weight: 700,
        authors: ["Kulaini"],
        ISBN: "0987654321",
        publisher: "Shia Publishers",
        publicationYear: 2018,
        language: "Arabic/English",
        pages: 600,
        format: "Hardcover",
        subject: "Hadith Studies",
      },
    ];

    const books = await Book.insertMany(sampleBooks);
    console.log("Books seeded.");

    // 2. Seed Other Products
    const sampleProducts = [
      {
        name: "Elegant Pen",
        description: "A smooth and stylish pen for daily use.",
        price: 4.99,
        sku: "PEN001",
        brand: "Stationery Co.",
        category: "Stationery",
        tags: ["pen", "stationery", "writing"],
        stock: 100,
        images: ["pen-image-url"],
        weight: 50,
      },
      {
        name: "Leather Bookmark",
        description: "Handcrafted leather bookmark with elegant design.",
        price: 7.99,
        sku: "BKM001",
        brand: "Craftsman Creations",
        category: "Bookmarks",
        tags: ["bookmark", "reading"],
        stock: 70,
        images: ["bookmark-image-url"],
        weight: 30,
      },
    ];

    const products = await Product.insertMany(sampleProducts);
    console.log("Other products seeded.");

    // 3. Seed Users
    const sampleUsers = [
      {
        email: "user@example.com",
        passwordHash: "testpassword123", // Use bcrypt in real registration!
        name: "Regular User",
        role: "user",
      },
      {
        email: "admin@example.com",
        passwordHash: "adminpassword123",
        name: "Admin User",
        role: "admin",
      },
    ];

    const users = await User.insertMany(sampleUsers);
    console.log("Users seeded.");

    // 4. Seed Orders
    const sampleOrders = [
      {
        user: users[0]._id,
        lineItems: [
          {
            product: books[0]._id,
            name: books[0].name,
            price: books[0].price,
            quantity: 2,
          },
          {
            product: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 1,
          },
        ],
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          line1: "123 Main Street",
          city: "Testville",
          postalCode: "12345",
          country: "Testland",
        },
        billingAddress: {
          firstName: "John",
          lastName: "Doe",
          line1: "123 Main Street",
          city: "Testville",
          postalCode: "12345",
          country: "Testland",
        },
        totalAmount: 44.97,
      },
    ];

    await Order.insertMany(sampleOrders);
    console.log("Orders seeded.");

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
