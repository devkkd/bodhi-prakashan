const User = require("../models/User");

// ✅ UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ SAVE ADDRESS
exports.saveAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newAddress = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      pincode: req.body.pincode,
      city: req.body.city,
      state: req.body.state,
      addressLine: req.body.addressLine,
      isDefault: user.addresses.length === 0 // first address default
    };

    user.addresses.push(newAddress);
    await user.save();

    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET USER (for auto-fill phone + addresses)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};