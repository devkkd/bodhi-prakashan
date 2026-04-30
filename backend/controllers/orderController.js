const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { createShipment } = require("../services/shiprocketService");

// 🔥 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =====================================
// ✅ CREATE RAZORPAY ORDER
// =====================================
exports.createRazorpayOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const totalAmount = cart.items.reduce((acc, item) => {
      // Safety check: ensure product still exists in DB
      const price = item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    res.json({
      razorpayOrder,
      amount: totalAmount,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================================
// ✅ VERIFY PAYMENT + CREATE ORDER
// =====================================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
    } = req.body;

    // 🔐 VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 🔥 PREVENT DUPLICATE ORDER
    const existingOrder = await Order.findOne({ razorpayPaymentId: razorpay_payment_id });
    if (existingOrder) {
      return res.json({ message: "Order already exists", order: existingOrder });
    }

    // Inside exports.verifyPayment ...

    // 🔥 GET CART & POPULATE (This gets the latest product details safely from the DB)
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    // 🔥 SNAPSHOT ITEMS
    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      // This extracts mainImage from the Product model and passes it to the Order model
      mainImage: item.productId.mainImage || (item.productId.galleryImages && item.productId.galleryImages[0]) || "",
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 🔥 CREATE ORDER
    const order = await Order.create({
      userId: req.user.id,
      items, // <-- This now correctly contains mainImage
      address,
      totalAmount,
      paymentStatus: "paid",
      orderStatus: "confirmed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    // =====================================
    // 🚚 STEP 3 — SHIPROCKET INTEGRATION
    // =====================================
    try {
      const shipment = await createShipment(order);

      if (shipment) {
        order.shipmentId = shipment.shipment_id;
        order.awbCode = shipment.awb_code;
        order.courierName = shipment.courier_name;
        order.trackingUrl = shipment.tracking_url;

        if (shipment.awb_code) {
          order.orderStatus = "shipped";
        }
        await order.save();
      }
    } catch (err) {
      console.error("🚨 Shiprocket Error:", err.response?.data || err.message);
      // We don't throw error here so user gets their success screen
    }

    // 🔥 CLEAR CART
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [] } }
    );

    res.json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// =====================================
// ✅ GET USER ORDERS
// =====================================
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};