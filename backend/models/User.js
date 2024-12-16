const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  line1: { type: String, required: true },
  line2: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }, // Store hash, not plain text
  name: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: { type: [addressSchema], default: [] },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, 
{ 
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
