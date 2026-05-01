const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin; // 🔥 IMPORT ADMIN LOCK
const Order = require("../models/Order"); 

const {
  createRazorpayOrder,
  verifyPayment,
  getOrders,
} = require("../controllers/orderController");

// =====================================
// 👤 USER ROUTES
// =====================================

// Create Razorpay Order
router.post("/create", authMiddleware, createRazorpayOrder);

// Verify Payment and Create DB Order
router.post("/verify", authMiddleware, verifyPayment);

// Get logged-in user's orders
router.get("/", authMiddleware, getOrders);


// =====================================
// 🔐 ADMIN ROUTES (Strictly Protected)
// =====================================

// Update Order Status
router.put("/status/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Check if status is valid according to your Schema enum
    const validStatuses = ["created", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("Order Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;