const express = require("express");
const { sendOtp, verifyOtp, getDevOtp } = require("../controllers/authController");
const router = express.Router();

router.get("/test", (req, res) => res.send("Auth route working"));

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// 🔥 NEW: Dev Route
router.get("/dev-otp/:phone", getDevOtp); 

module.exports = router;