const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  updateProfile,
  saveAddress,
  getMe,
  getAddresses,
} = require("../controllers/userController");

router.post("/profile", authMiddleware, updateProfile);
router.post("/address", authMiddleware, saveAddress);
router.get("/me", authMiddleware, getMe);
router.get("/addresses", authMiddleware, getAddresses);


module.exports = router;