const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

// 🔥 get all orders
router.get("/", authMiddleware, getAllOrders);

// 🔥 update status
router.put("/:id/status", authMiddleware, updateOrderStatus);

module.exports = router;