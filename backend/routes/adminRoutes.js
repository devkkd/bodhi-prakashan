const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Import Controllers
const { adminLogin, getAllUsers, getUserById } = require("../controllers/adminController");
const { getAllInquiries, updateInquiryStatus } = require("../controllers/inquiryController"); // 🔥 NEW

// Public Admin Route
router.post("/login", adminLogin);

// Protected Admin Routes
router.get("/users", authMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, getUserById); // 🔥 Add this line

// 🔥 NEW: Inquiry Routes
router.get("/inquiries", authMiddleware, getAllInquiries);
router.put("/inquiries/:id/status", authMiddleware, updateInquiryStatus);


module.exports = router;