const mongoose = require('mongoose');

// Base Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  sku: { type: String, unique: true, required: true },
  brand: { type: String, default: '' },
  category: { type: String, default: '' },
  tags: { type: [String], default: [] },
  images: { type: [String], default: [] },
  stock: { type: Number, default: 0 },
  dimensions: {
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    depth: { type: Number, default: 0 }
  },
  weight: { type: Number, default: 0 }
}, 
{ 
  discriminatorKey: 'productType',
  collection: 'products',
  timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

const bookSchema = new mongoose.Schema({
    authors: { type: [String], required: true },
    ISBN: { type: String, unique: true, required: true },
    publisher: { type: String, default: '' },
    publicationYear: { type: Number, default: null },
    language: { type: String, default: '' },
    pages: { type: Number, default: 0 },
    format: { type: String, enum: ['Hardcover', 'Paperback', 'eBook'], default: 'Paperback' },
    subject: { type: String, default: '' },
    translator: { type: [String], default: [] },
    classifications: {
      category: { type: String, default: '' },
      subCategory: { type: String, default: '' },
    },
    borrowable: { type: Boolean, default: false }
  });
  
  const Book = Product.discriminator('Book', bookSchema);
  

module.exports = { Product, Book };
