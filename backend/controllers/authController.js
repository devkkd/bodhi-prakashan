// controllers/authController.js

const Otp = require("../models/Otp");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ 1. Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ phone, otp, expiresAt });

    console.log("OTP:", otp);

    res.json({ message: "OTP sent" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 2. Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = await Otp.findOne({ phone, otp });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone, isVerified: true });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};