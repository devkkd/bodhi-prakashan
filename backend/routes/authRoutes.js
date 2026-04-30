//backend\routes\authRoutes.js
const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/authController");
const router = express.Router();

// 🔥 DEBUG LOG
console.log("Auth routes loaded");

// 🔥 TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;