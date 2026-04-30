const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  deleteSubCategory
} = require("../controllers/subCategoryController");

router.post("/", createSubCategory);
router.get("/", getSubCategories);
router.delete("/:id", deleteSubCategory);

module.exports = router;