const SubCategory = require("../models/SubCategory");

// ✅ Add SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const { title, category } = req.body;

    const sub = await SubCategory.create({
      title,
      category
    });

    res.json(sub);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Get all (with category populated)
exports.getSubCategories = async (req, res) => {
  try {
    const subs = await SubCategory.find()
      .populate("category", "nameHindi nameEnglish");

    res.json(subs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ Delete
exports.deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};