const jwt = require("jsonwebtoken");

// 1. General Protection (Checks if user is logged in)
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user
    req.user = decoded;

    // Backward compatibility for routes that happen to have /admin in the URL
    if (req.originalUrl.includes("/admin")) {
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
      }
    }

    next();
  } catch (err) {
    console.error("Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔥 2. Strict Admin Protection (Use this on specific admin-only routes)
authMiddleware.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Strict Admin Access Required" });
  }
};

module.exports = authMiddleware;