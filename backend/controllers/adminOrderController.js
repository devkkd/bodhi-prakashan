const Order = require("../models/Order");

// =====================================
// ✅ GET ALL ORDERS (ADMIN)
// =====================================
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================================
// ✅ UPDATE ORDER STATUS
// =====================================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["created", "confirmed", "shipped", "delivered", "cancelled"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

