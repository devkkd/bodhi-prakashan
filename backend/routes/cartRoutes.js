const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  mergeCart,
} = require("../controllers/cartController");
 
router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove/:productId", authMiddleware, removeItem);
router.post("/merge", authMiddleware, mergeCart);


module.exports = router;