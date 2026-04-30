//backend\models\Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  nameHindi: {
    type: String,
    required: true
  },
  nameEnglish: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);