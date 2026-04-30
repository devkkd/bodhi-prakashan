"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Minus } from "lucide-react"; // 🔥 Added icons

const AddToCartButton = ({ product }) => {
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const router = useRouter();

  const item = cartItems.find((i) => i.id === product.id);
  const quantity = item ? item.quantity : 0;

  // 🔥 STATE 1: NOT IN CART
  if (quantity === 0) {
    return (
      <button
        onClick={() => addToCart(product, router)}
        className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-[#111111] hover:bg-[#2a2a2a] text-white text-[14px] font-bold py-3 px-8 rounded-full transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md"
      >
        <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        <span>Add To Cart</span>
      </button>
    );
  }

  // 🔥 STATE 2: ALREADY IN CART (Unified Pill Design)
  return (
    <div className="flex items-center justify-between w-full sm:w-[160px] bg-gray-100 border border-gray-200 rounded-full p-1 shadow-inner h-[48px] animate-in fade-in zoom-in-95 duration-200">
      
      {/* Decrease Button */}
      <button
        onClick={() => decreaseQty(product.id)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-200 hover:text-red-500 transition-colors shadow-sm active:scale-90"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Quantity Display */}
      <span className="w-10 text-center text-[15px] font-black text-gray-900 select-none">
        {quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={() => increaseQty(product.id)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#111111] text-white hover:bg-[#2a2a2a] transition-colors shadow-sm active:scale-90"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>

    </div>
  );
};

export default AddToCartButton;