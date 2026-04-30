const Inquiry = require("../models/Inquiry");

// =====================================
// 🔓 PUBLIC: SUBMIT CONTACT FORM
// =====================================
exports.submitInquiry = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, subject, city, message } = req.body;

    // Basic validation
    if (!firstName || !phone || !email || !message) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const newInquiry = await Inquiry.create({
      firstName,
      lastName,
      phone,
      email,
      subject,
      city,
      message
    });

    res.status(201).json({ 
      success: true, 
      message: "Thank you! Your message has been sent successfully.",
      inquiry: newInquiry 
    });

  } catch (err) {
    console.error("Inquiry Submit Error:", err);
    res.status(500).json({ error: "Failed to submit inquiry. Please try again." });
  }
};

// =====================================
// 🔐 ADMIN: GET ALL INQUIRIES
// =====================================
exports.getAllInquiries = async (req, res) => {
  try {
    // Fetch all inquiries, newest first
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: Mark as Read/Resolved
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};