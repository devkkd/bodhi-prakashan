const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      mainImage: String, // 🔥 MUST BE mainImage, NOT image
      quantity: Number,
      price: Number,
    },
  ],
  // ... rest of your schema (address, totalAmount, paymentStatus, etc.)
  address: {
    fullName: String,
    phone: String,
    pincode: String,
    city: String,
    state: String,
    addressLine: String,
  },
  totalAmount: Number,
  paymentStatus: { type: String, default: "pending" },
  orderStatus: { type: String, default: "created" },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  shipmentId: String,
  awbCode: String,
  courierName: String,
  trackingUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);