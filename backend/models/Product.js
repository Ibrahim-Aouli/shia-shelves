const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    sku: { type: String, unique: true, required: true },
    itemType: { 
        type: String, 
        enum: ['Book', 'Gift', 'Stationery', 'Clothing', 'Miscellaneous'], 
        required: true 
    },
    category: { type: String, default: '' }, // e.g., Religious, Political, History
    subCategory: { type: String, default: '' }, // e.g., Notebooks, Pens for stationery
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },

    // Book-specific fields
    authors: { type: [String], default: [] },
    ISBN: { type: String, unique: true, sparse: true },
    publisher: { type: String, default: '' },
    publicationYear: { type: Number, default: null },
    pages: { type: Number, default: 0 },
    format: { type: String, enum: ['Hardcover', 'Paperback', 'eBook'], default: 'Paperback' },

    // Additional fields for gifts, stationery, or clothing
    weight: { type: Number, default: 0 },
    dimensions: {
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        depth: { type: Number, default: 0 }
    },
    tags: { type: [String], default: [] }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
