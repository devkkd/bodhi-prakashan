//backend\routes\categoryRoutes.js
const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategories,
  deleteCategory
} = require("../controllers/categoryController");

router.post("/", addCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);

module.exports = router;

