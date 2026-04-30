const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  city: { type: String, required: true },
  message: { type: String, required: true },
  
  // For Admin tracking
  status: { 
    type: String, 
    enum: ["new", "read", "resolved"], 
    default: "new" 
  }
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);