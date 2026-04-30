"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  // Dynamic Pricing Logic based on actual item prices
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const totalSellingPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = totalMRP - totalSellingPrice;
  
  // Changed delivery to 0 to remove it from calculations
  const delivery = 0; 
  const grandTotal = totalSellingPrice + delivery;

  const handleCheckout = () => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcf9f5] flex flex-col items-center justify-center pt-[220px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">आपकी कार्ट खाली है / Your cart is empty</h2>
        <button
          onClick={() => router.push('/store')}
          className="bg-[#FCA57D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#f49368] transition-colors"
        >
          किताबें खोजें / Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pb-24 pt-[220px]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* --- LEFT: CART ITEMS --- */}
        <div className="flex-1 lg:pr-8">
          <div className="mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-[20px] md:text-[22px] font-extrabold tracking-tight">
              <span className="text-[#F89E6E]">Shopping Cart</span>
              <span className="text-black ml-3 font-medium">आपकी अगली शाम / Your next evening</span>
            </h1>
          </div>

          <div className="flex flex-col">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 border-b border-gray-200 py-8 items-start"
              >
                <div className="w-[100px] md:w-[120px] aspect-[2/3] shrink-0 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                  <img
                    // 🔥 UPDATED: Prioritize mainImage, fallback to image (for cached items), then placeholder
                    src={item.mainImage || item.image || "https://via.placeholder.com/300x450?text=No+Cover"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    // 🔥 UPDATED: Prevents infinite 404 loop
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
                    }}
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <h2 className="text-[16px] md:text-[18px] font-semibold text-black leading-snug mb-3">
                    {item.title}
                  </h2>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-xl md:text-2xl font-black text-black">₹{item.price}</span>
                    {item.discount && (
                      <span className="text-[14px] font-bold text-[#F89E6E]">{item.discount}</span>
                    )}
                    {item.originalPrice && (
                      <span className="text-[14px] font-semibold text-gray-400 line-through">
                        ₹{item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mt-auto">
                    <div className="flex items-center gap-4 border border-gray-300 rounded-full px-5 py-1.5 w-fit bg-white">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="text-gray-600 hover:text-black text-lg font-medium w-4 flex justify-center"
                      >
                        −
                      </button>
                      <span className="text-[15px] font-bold text-black w-4 flex justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="text-gray-600 hover:text-black text-lg font-medium w-4 flex justify-center"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[14px] text-gray-800 font-medium hover:text-black transition-colors"
                    >
                      बाद के लिए रखें / Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: PRICE SUMMARY --- */}
        <div className="w-full lg:w-[400px] lg:border-l lg:border-gray-200 lg:pl-16">
          <div className="">
            <h2 className="text-[18px] md:text-[20px] font-extrabold text-black mb-8 tracking-tight">
              Price Details ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Books)
            </h2>

            <div className="flex flex-col gap-4 text-[16px] text-black font-medium mb-6">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span className="font-bold">₹{totalMRP.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[#F89E6E]">
                <span>Discount on MRP</span>
                <span className="font-bold">-₹{discount.toFixed(2)}</span>
              </div>
              
              {/* Delivery row has been removed from here */}
            </div>

            <div className="border-t border-gray-300 my-6"></div>

            <div className="flex justify-between items-center text-[22px] font-black text-black mb-8">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#FCA57D] hover:bg-[#f49368] text-black py-4 rounded-full font-bold transition-all"
            >
              Checkout →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;