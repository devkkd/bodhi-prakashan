const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin; // 🔥 IMPORT ADMIN LOCK

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

// 🔥 get all orders (Admin Only)
router.get("/", authMiddleware, isAdmin, getAllOrders);

// 🔥 update status (Admin Only)
router.put("/:id/status", authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;