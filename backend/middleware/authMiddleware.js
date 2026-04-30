const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ attach user
    req.user = decoded;

    // 🔥 ADMIN PROTECTION
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