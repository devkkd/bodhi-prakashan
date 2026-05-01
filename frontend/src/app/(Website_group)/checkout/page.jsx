"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  createRazorpayOrder,
  verifyPayment,
  getAddresses,
  addAddress,
} from "@/lib/api";

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await getAddresses();
      setAddresses(res.data);
      if (res.data.length > 0) {
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async () => {
    if (!form.fullName || !form.phone || !form.addressLine || !form.city || !form.state || !form.pincode) {
      return alert("Fill all fields properly");
    }

    try {
      await addAddress(form);
      const res = await getAddresses();
      setAddresses(res.data);
      setSelectedIndex(res.data.length - 1);
      setForm({ fullName: "", phone: "", pincode: "", city: "", state: "", addressLine: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add address");
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (selectedIndex === null) return alert("Please select a delivery address");
    const selectedAddress = addresses[selectedIndex];
    setLoading(true);

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) return alert("Razorpay failed to load");

      const { data } = await createRazorpayOrder();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          // 🔥 We only send the address and payment info. Backend pulls the cart images securely!
          await verifyPayment({
            ...response,
            address: selectedAddress,
          });
          router.push("/success");
        },
        theme: { color: "#FCA57D" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
    setLoading(false);
  };

  const orderTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🔥 Check if any item in the cart is out of stock
  const hasOutOfStockItems = cartItems.some(item => item.inStock === false);

  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#fcf9f5] min-h-screen flex flex-col items-center justify-center pt-[220px]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Cart is empty</h2>
        <button onClick={() => router.push('/store')} className="bg-[#FCA57D] px-6 py-2 rounded-full font-bold">Go to Store</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pb-24 pt-[180px] md:pt-[220px]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-black tracking-tight mb-2">Checkout</h1>
          <p className="text-gray-500 font-medium italic">कहाँ भेजें? / Where should we send it?</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Addresses */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
              <h2 className="text-[18px] font-extrabold text-black mb-6 uppercase tracking-wider">
                1. Select Delivery Address
              </h2>

              <div className="space-y-4 mb-8">
                {addresses.length === 0 && !showForm && (
                  <p className="text-gray-500 italic">No saved addresses found.</p>
                )}
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative flex items-start gap-4 p-5 cursor-pointer rounded-2xl border-2 transition-all duration-200 
                      ${selectedIndex === index 
                        ? "border-[#FCA57D] bg-[#fefaf8]" 
                        : "border-gray-100 bg-white hover:border-gray-200"}`}
                  >
                    <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0
                      ${selectedIndex === index ? "border-[#FCA57D]" : "border-gray-300"}`}>
                      {selectedIndex === index && <div className="h-2.5 w-2.5 rounded-full bg-[#FCA57D]" />}
                    </div>

                    <div className="flex-1">
                      <p className="font-black text-black text-lg">{addr.fullName}</p>
                      <p className="text-gray-500 font-bold text-sm mb-2">{addr.phone}</p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {addr.addressLine}, {addr.city}, {addr.state} — <span className="font-bold">{addr.pincode}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD ADDRESS BUTTON/FORM */}
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="group flex items-center gap-2 text-[#F89E6E] font-bold text-sm hover:text-[#f49368] transition-colors"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">+</span>
                  नया पता जोड़ें / Add New Address
                </button>
              ) : (
                <div className="mt-6 p-6 rounded-2xl bg-gray-50 border border-dashed border-gray-300">
                  <h3 className="font-extrabold mb-6 text-black">New Address Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Full Name</label>
                      <input name="fullName" value={form.fullName} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Address Line</label>
                      <input name="addressLine" value={form.addressLine} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">City</label>
                      <input name="city" value={form.city} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">State</label>
                      <input name="state" value={form.state} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                    <div className="flex flex-col gap-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Pincode</label>
                      <input name="pincode" value={form.pincode} onChange={handleChange} className="bg-transparent border-b-2 border-gray-200 py-2 outline-none focus:border-[#FCA57D] transition-colors font-medium" />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={handleAddAddress} 
                      className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      Save Address
                    </button>
                    <button 
                      onClick={() => setShowForm(false)} 
                      className="px-8 py-3 border-2 border-gray-200 rounded-full font-bold text-sm text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary & Payment */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="text-[18px] font-extrabold text-black mb-6 uppercase tracking-wider">
                2. Order Summary
              </h2>

              {/* Order Items List */}
              <div className="flex flex-col gap-4 mb-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className={`flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0 ${item.inStock === false ? 'opacity-60' : ''}`}>
                    <div className="w-16 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative">
                      <img 
                        src={item.mainImage || item.image || "https://via.placeholder.com/150x200?text=No+Cover"} 
                        alt={item.title}
                        className={`w-full h-full object-cover ${item.inStock === false ? 'grayscale' : ''}`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150x200?text=No+Cover";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-black line-clamp-2 leading-tight mb-1">{item.title}</h3>
                      {item.inStock === false ? (
                        <p className="text-xs font-bold text-red-500 mb-1">Out of Stock</p>
                      ) : (
                        <p className="text-xs text-gray-500 font-medium mb-1">Qty: {item.quantity}</p>
                      )}
                      <p className="text-[14px] font-black text-black">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-6 border-dashed"></div>

              {/* Total & Pay Button */}
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-between items-end mb-6">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total to Pay</span>
                  <span className="text-3xl font-black text-black">₹{orderTotal}</span>
                </div>

                {/* 🔥 Show warning if out of stock */}
                {hasOutOfStockItems && (
                  <div className="w-full mb-4 text-center text-xs font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                    An item in your cart went out of stock. Please return to your cart to remove it.
                  </div>
                )}

                <button
                  onClick={handlePayment}
                  // 🔥 Disable if loading, no address selected, OR there's an out of stock item
                  disabled={loading || selectedIndex === null || hasOutOfStockItems}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-black text-lg transition-all shadow-md
                    ${loading || selectedIndex === null || hasOutOfStockItems
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                      : "bg-[#FCA57D] text-black hover:bg-[#f49368] active:scale-95"}`}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay & Complete Order →"
                  )}
                </button>
                
                <p className="mt-4 text-[11px] text-gray-400 font-medium text-center">
                  Secured by Razorpay. 100% Safe Payments.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;