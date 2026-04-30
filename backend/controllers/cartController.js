const Cart = require("../models/Cart");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // 🔥 VALIDATION
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid productId" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity: 1 }],
      });

      return res.json(cart);
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();

    res.json(cart);

  } catch (err) {
    console.error("❌ ADD CART ERROR:", err); // ADD THIS
    res.status(500).json({ error: err.message });
  }
};


// ✅ 2. GET CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId"); // optional (for product details)

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ 3. UPDATE QUANTITY
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId required" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // 🔥 create cart if not exists
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      // 🔥 FIX: ADD NEW ITEM instead of failing
      if (quantity > 0) {
        cart.items.push({
          productId,
          quantity,
        });
      }
    } else {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    await cart.save();

    res.json(cart);

  } catch (err) {
    console.error("❌ UPDATE CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};



// ✅ 4. REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.mergeCart = async (req, res) => {
  try {
    const { guestCart } = req.body;

    if (!Array.isArray(guestCart)) {
      return res.status(400).json({ message: "guestCart must be array" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    // 🔥 USE MAP (SAFE)
    const cartMap = new Map();

    // DB items
    cart.items.forEach(item => {
      cartMap.set(
        item.productId.toString(),
        item.quantity
      );
    });

    // Guest items
    guestCart.forEach(item => {
      const id = item.productId?.toString();
      const qty = Number(item.quantity) || 0;

      if (!id || qty <= 0) return;

      if (cartMap.has(id)) {
        cartMap.set(id, cartMap.get(id) + qty);
      } else {
        cartMap.set(id, qty);
      }
    });

    // Convert back
    const mergedItems = Array.from(cartMap.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));

    // 🔥 CRITICAL FIX (NO VERSION ERROR)
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: mergedItems } },
      { new: true }
    ).populate("items.productId");

    res.json(updatedCart);

  } catch (err) {
    console.error("❌ MERGE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
