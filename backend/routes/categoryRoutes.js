const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin;

const {
  addCategory,
  getCategories,
  deleteCategory
} = require("../controllers/categoryController");

// 🌍 PUBLIC ROUTE
router.get("/", getCategories);

// 🔐 SECURE ADMIN ROUTES
router.post("/", authMiddleware, isAdmin, addCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;