//backend\controllers\categoryController.js
const Category = require("../models/Category");


// ✅ Add Category
exports.addCategory = async (req, res) => {
  try {
    const { nameHindi, nameEnglish } = req.body;

    const category = await Category.create({
      nameHindi,
      nameEnglish
    });

    res.json(category);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};