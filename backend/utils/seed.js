const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const FAQ = require("./models/FAQ");
const Contact = require("./models/Contact");

require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB.");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

const seedData = async () => {
    try {
        console.log("Seeding data for Shia Shelves...");

        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await Cart.deleteMany();
        await Order.deleteMany();
        await FAQ.deleteMany();
        await Contact.deleteMany();

        // Seed Categories
        const categories = await Category.insertMany([
            { name: "shia books", description: "Books focusing on Shia Islam, history, and beliefs." },
            { name: "gifts", description: "Islamic gifts for all occasions." },
            { name: "stationery", description: "High-quality stationery for Islamic and general use." },
            { name: "clothing", description: "Modest clothing and Islamic attire." },
            { name: "miscellaneous", description: "Other items for your spiritual journey." },
        ]);
        console.log("Categories seeded.");

        // Seed Products
        const products = await Product.insertMany([
            {
                name: "Nahjul Balagha",
                description: "The Peak of Eloquence, sermons and letters of Imam Ali (AS).",
                price: 25.99,
                sku: "NB001",
                itemType: "Book",
                category: "shia books",
                stock: 50,
                authors: ["Imam Ali (AS)"],
                ISBN: "978-1234567890",
                publisher: "Shia Shelves Publications",
                publicationYear: 2015,
                pages: 350,
                format: "Hardcover",
                tags: ["Islam", "Shia", "Imam Ali"]
            },
            {
                name: "Tasbih Beads",
                description: "High-quality Tasbih beads for daily prayers.",
                price: 9.99,
                sku: "TB002",
                itemType: "Gift",
                category: "gifts",
                stock: 100,
                tags: ["Tasbih", "Prayer", "Islam"]
            },
            {
                name: "Shia Desk Calendar",
                description: "A calendar featuring important Islamic dates and events.",
                price: 14.99,
                sku: "SDC003",
                itemType: "Stationery",
                category: "stationery",
                stock: 70,
                tags: ["Calendar", "Islamic", "Dates"]
            },
            {
                name: "Islamic Modest Wear - Abaya",
                description: "Elegant black abaya for modest wear.",
                price: 49.99,
                sku: "IMW004",
                itemType: "Clothing",
                category: "clothing",
                stock: 30,
                tags: ["Abaya", "Clothing", "Modesty"]
            },
            {
                name: "Ziyarat Guide",
                description: "Comprehensive guide to important Shia Ziyarat sites.",
                price: 19.99,
                sku: "ZG005",
                itemType: "Book",
                category: "shia books",
                stock: 40,
                authors: ["Sayyed Ammar Nakshawani"],
                ISBN: "978-0987654321",
                publisher: "Shia Shelves Publications",
                publicationYear: 2021,
                pages: 150,
                format: "Paperback",
                tags: ["Ziyarat", "Shia", "Travel"]
            },
        ]);
        console.log("Products seeded.");

        // Seed Users
        const hashedPassword = await bcrypt.hash("password123", 10);
        const users = await User.insertMany([
            {
                email: "admin@shiashelves.com",
                password: hashedPassword,
                name: "Admin User",
                role: "admin",
                addresses: [],
                isActive: true
            },
            {
                email: "user1@shiashelves.com",
                password: hashedPassword,
                name: "Regular User",
                role: "user",
                addresses: [
                    {
                        firstName: "Ali",
                        lastName: "Hassan",
                        line1: "123 Islamic Center Rd",
                        city: "Sydney",
                        postalCode: "2000",
                        country: "Australia"
                    }
                ],
                isActive: true
            },
        ]);
        console.log("Users seeded.");

        // Seed FAQs
        await FAQ.insertMany([
            { question: "What is Shia Shelves?", answer: "Shia Shelves is your go-to Islamic bookstore in Sydney, offering a wide range of books, gifts, and more." },
            { question: "Do you ship internationally?", answer: "Yes, we offer international shipping for most of our products." },
            { question: "What is your return policy?", answer: "We accept returns within 14 days of purchase, provided the item is in its original condition." },
        ]);
        console.log("FAQs seeded.");

        // Seed Contacts
        await Contact.insertMany([
            {
                name: "Ahmed Ali",
                email: "ahmedali@gmail.com",
                subject: "Order Inquiry",
                message: "Can I get my order delivered faster?"
            },
            {
                name: "Fatima Zahra",
                email: "fatimaz@gmail.com",
                subject: "Book Recommendation",
                message: "Can you recommend a good book for someone new to Shia Islam?"
            }
        ]);
        console.log("Contacts seeded.");

        console.log("Seeding completed for Shia Shelves!");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
