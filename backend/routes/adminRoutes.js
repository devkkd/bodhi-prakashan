const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin; // 🔥 IMPORT ADMIN LOCK

// Import Controllers
const { adminLogin, getAllUsers, getUserById } = require("../controllers/adminController");
const { getAllInquiries, updateInquiryStatus } = require("../controllers/inquiryController");

// Public Admin Route (Needs to be public so the admin can actually log in!)
router.post("/login", adminLogin);

// Protected Admin Routes
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/users/:id", authMiddleware, isAdmin, getUserById);

// Protected Inquiry Routes
router.get("/inquiries", authMiddleware, isAdmin, getAllInquiries);
router.put("/inquiries/:id/status", authMiddleware, isAdmin, updateInquiryStatus);

module.exports = router;