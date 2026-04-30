const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const productController = require("../controllers/productController");


router.post(
  "/",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  productController.createProduct
);

router.put(
  "/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  productController.updateProduct
);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;