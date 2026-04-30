const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  fullName: String,
  phone: String,
  pincode: String,
  city: String,
  state: String,
  addressLine: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
}, { _id: true });

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  email: String,

  isVerified: {
    type: Boolean,
    default: false,
  },

  // 🔥 NEW
  addresses: [addressSchema],

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);