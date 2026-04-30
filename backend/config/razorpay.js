const Razorpay = require("razorpay");

// 🔥 ADD THIS HERE
// console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = instance;