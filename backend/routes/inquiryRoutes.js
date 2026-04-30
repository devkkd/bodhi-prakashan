const express = require("express");
const router = express.Router();
const { submitInquiry } = require("../controllers/inquiryController");

// POST /api/inquiries
router.post("/", submitInquiry);

module.exports = router;
