//backend\models\Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writer: String,
  description: String,
  note: String,

  price: { type: Number, required: true },
  originalPrice: Number,

  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },

  // ✅ NEW
  mainImage: { type: String, required: true },
  galleryImages: [String],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  },

  bookDetails: {
    asin: String,
    publicationDate: String,
    printLength: String,
    itemWeight: String,
    dimensions: String,
    countryOfOrigin: String,
    packer: String,
    genericName: String
  },

  readingTime: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);