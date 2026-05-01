const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

// Import Auth Tools
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = authMiddleware.isAdmin;

// ==========================================
// 🌍 PUBLIC ROUTES (Anyone can view)
// ==========================================
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// ==========================================
// 🔐 SECURE ADMIN ROUTES (Only Admin can modify)
// ==========================================
router.post(
  "/",
  authMiddleware, // First check if logged in
  isAdmin,        // Then check if role is admin
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  productController.createProduct
);

router.put(
  "/:id",
  authMiddleware, 
  isAdmin,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  productController.updateProduct
);

router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);

module.exports = router;