const jwt = require("jsonwebtoken");
const User = require("../models/User"); // 🔥 Import the User model
const Cart = require("../models/Cart"); // 🔥 IMPORT CART MODEL

// 🔐 HARDCODED ADMIN (simple version)
const ADMIN_EMAIL = "bodhi@gmail.com";
const ADMIN_PASSWORD = "bodhi@123";

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ❌ wrong credentials
    if (username !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ create token
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 NEW: GET ALL USERS FOR DASHBOARD
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users, sort by newest first. 
    // We deselect the password if you eventually add one to the schema (-password)
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 UPGRADED: GET USER BY ID (Now includes populated Cart)
exports.getUserById = async (req, res) => {
  try {
    // .lean() converts the Mongoose document into a plain JavaScript object so we can add the cart to it
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user's cart and populate the actual product details (title, price, mainImage)
    const cart = await Cart.findOne({ userId: req.params.id })
      .populate("items.productId")
      .lean();

    // Attach the cart items to the user response (or an empty array if no cart exists)
    user.cart = cart && cart.items ? cart.items : [];

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    // 1. Fetch all users and convert to plain JS objects (.lean()) so we can modify them
    const users = await User.find().sort({ createdAt: -1 }).lean();

    // 2. Fetch all active carts
    const carts = await Cart.find().lean();

    // 3. Create a quick lookup map for carts with items
    const cartMap = new Map();
    carts.forEach(cart => {
      if (cart.items && cart.items.length > 0) {
        cartMap.set(cart.userId.toString(), cart.items.length);
      }
    });

    // 4. Attach the cart count to each user
    const usersWithCartInfo = users.map(user => ({
      ...user,
      cartItemsCount: cartMap.get(user._id.toString()) || 0
    }));

    res.json(usersWithCartInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
