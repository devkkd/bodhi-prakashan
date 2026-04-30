const axios = require("axios");

let shiprocketToken = null;
let tokenExpiry = null;

// 🔐 Get Token
const getShiprocketToken = async () => {
  try {
    // reuse token if not expired
    if (shiprocketToken && tokenExpiry && Date.now() < tokenExpiry) {
      return shiprocketToken;
    }

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );

    shiprocketToken = res.data.token;

    // token valid ~240 hours (set safe expiry buffer)
    tokenExpiry = Date.now() + 200 * 60 * 60 * 1000;

    return shiprocketToken;

  } catch (err) {
    console.error("Shiprocket Auth Error:", err.response?.data || err.message);
    throw new Error("Shiprocket Auth Failed");
  }
};

// 🚚 Create Shipment
exports.createShipment = async (order) => {
  try {
    const token = await getShiprocketToken();

    const payload = {
      order_id: order._id.toString(),
      order_date: new Date().toISOString().split("T")[0],

      pickup_location: "Primary", // must exist in Shiprocket dashboard

      billing_customer_name: order.address.fullName,
      billing_last_name: "",
      billing_address: order.address.addressLine,
      billing_city: order.address.city,
      billing_pincode: order.address.pincode,
      billing_state: order.address.state,
      billing_country: "India",
      billing_email: "test@test.com", // optional
      billing_phone: order.address.phone,

      shipping_is_billing: true,

      order_items: order.items.map(item => ({
        name: item.title,
        sku: item.productId.toString(),
        units: item.quantity,
        selling_price: item.price,
      })),

      payment_method: "Prepaid",

      sub_total: order.totalAmount,

      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    };

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;

  } catch (err) {
    console.error("Shiprocket Order Error:", err.response?.data || err.message);
    throw new Error("Shiprocket Order Failed");
  }
};