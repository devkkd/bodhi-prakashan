const Otp = require("../models/Otp");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ 1. Send OTP (Updated to return OTP for Dev Mode)
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ phone, otp, expiresAt });

    console.log("OTP:", otp);

    // 🔥 Added `otp` to the response so the frontend can show the popup on Resend
    res.json({ message: "OTP sent", otp }); 

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 2. Verify OTP (Leave exactly as is)
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const record = await Otp.findOne({ phone, otp });

    if (!record) return res.status(400).json({ message: "Invalid OTP" });
    if (record.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

    let user = await User.findOne({ phone });
    if (!user) user = await User.create({ phone, isVerified: true });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 3. NEW: Fetch latest OTP for Dev Popup
exports.getDevOtp = async (req, res) => {
  try {
    // Finds the most recent OTP for this number
    const record = await Otp.findOne({ phone: req.params.phone }).sort({ _id: -1 });
    if (record) {
      return res.json({ otp: record.otp });
    }
    res.status(404).json({ message: "No OTP found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};