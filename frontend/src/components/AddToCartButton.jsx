"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Minus, XCircle } from "lucide-react"; 

const AddToCartButton = ({ product }) => {
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  // 🔥 STATE 0: OUT OF STOCK
  if (product.inStock === false) {
    return (
      <button
        disabled
        className="flex items-center justify-center gap-1.5 sm:gap-2 w-full bg-gray-200 text-gray-500 text-[12px] sm:text-[14px] font-bold py-2 sm:py-3 px-2 sm:px-8 rounded-full cursor-not-allowed"
      >
        <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="whitespace-nowrap">Out of Stock</span>
      </button>
    );
  }

  // Get current quantity in cart (supports both MongoDB _id and mapped id)
  const productId = product._id || product.id;
  const item = cartItems.find((i) => i.id === productId || i._id === productId);
  const quantity = item ? item.quantity : 0;

  // 🔥 STATE 1: NOT IN CART
  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product, router)}
        className="group flex items-center justify-center gap-1.5 sm:gap-2 w-full bg-[#111111] hover:bg-[#2a2a2a] text-white text-[12px] sm:text-[14px] font-bold py-2.5 sm:py-3 px-2 sm:px-8 rounded-full transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
      >
        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
        <span className="whitespace-nowrap">Add To Cart</span>
      </button>
    );
  }

  // 🔥 STATE 2: ALREADY IN CART (Unified Pill Design)
  return (
    <div className="flex items-center justify-between w-full bg-gray-100 border border-gray-200 rounded-full p-1 shadow-inner h-[40px] sm:h-[48px] animate-in fade-in zoom-in-95 duration-200">
      
      {/* Decrease Button */}
      <button
        onClick={() => decreaseQty(productId)}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-200 hover:text-red-500 transition-colors shadow-sm active:scale-90 flex-shrink-0"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
      </button>

      {/* Quantity Display */}
      <span className="w-8 sm:w-10 text-center text-[13px] sm:text-[15px] font-black text-gray-900 select-none">
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={() => increaseQty(productId)}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#111111] text-white hover:bg-[#2a2a2a] transition-colors shadow-sm active:scale-90 flex-shrink-0"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2.5} />
      </button>

    </div>
  );
};

export default AddToCartButton;