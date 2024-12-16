require('dotenv').config(); // If using environment variables
const mongoose = require('mongoose');
const { Product, Book } = require('../models/Product'); // Adjust path as needed

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shia-shelves');

    // Optional: clear existing products
    await Product.deleteMany({});

    const sampleBooks = [
      {
        productType: 'Book',
        name: 'Nahj al-Balagha',
        description: 'A collection of sermons, letters, and narrations attributed to Imam Ali (AS).',
        price: 19.99,
        sku: 'NB001',
        brand: 'Shia Publishers',
        category: 'Religion',
        tags: ['Islam', 'Shia', 'Hadith', 'Sermons'],
        stock: 50,
        dimensions: { width: 15, height: 20, depth: 3 },
        weight: 500,
        authors: ['Imam Ali (AS)'],
        ISBN: '1234567890',
        publisher: 'Shia Publishers',
        publicationYear: 2020,
        language: 'Arabic/English',
        pages: 400,
        format: 'Hardcover',
        subject: 'Islamic Theology',
        translator: ['Syed Ali Raza'],
        classifications: {
          category: 'Islamic Texts',
          subCategory: 'Hadith'
        }
      },
      {
        productType: 'Book',
        name: 'Al-Kafi',
        description: 'A fundamental collection of Shia Hadith.',
        price: 29.99,
        sku: 'AK001',
        brand: 'Shia Publishers',
        category: 'Religion',
        tags: ['Islam', 'Shia', 'Hadith'],
        stock: 30,
        dimensions: { width: 15, height: 22, depth: 4 },
        weight: 700,
        authors: ['Kulaini'],
        ISBN: '0987654321',
        publisher: 'Shia Publishers',
        publicationYear: 2018,
        language: 'Arabic/English',
        pages: 600,
        format: 'Hardcover',
        subject: 'Hadith Studies',
        translator: ['Mulla Saleh Mazandarani'],
        classifications: {
          category: 'Islamic Texts',
          subCategory: 'Hadith'
        }
      }
    ];

    await Book.insertMany(sampleBooks);
    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
