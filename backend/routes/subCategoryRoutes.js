const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin;

const {
  createSubCategory,
  getSubCategories,
  deleteSubCategory
} = require("../controllers/subCategoryController");

// 🌍 PUBLIC ROUTE
router.get("/", getSubCategories);

// 🔐 SECURE ADMIN ROUTES
router.post("/", authMiddleware, isAdmin, createSubCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteSubCategory);

module.exports = router;