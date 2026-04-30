// backend\server.js
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ ADD THIS

const authRoutes = require("./routes/authRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");

// 🔥 CORS CONFIG (THIS IS THE FIX)
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inquiries", inquiryRoutes);


// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// TEST
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => console.log("Server running on port 5000"));