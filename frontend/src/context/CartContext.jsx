"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addToCart as addToCartAPI,
  getCart as getCartAPI,
  updateCart,
  removeFromCart,
} from "@/lib/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const isLoggedIn = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("userToken");
  };

  const fetchCart = async () => {
    if (!isLoggedIn()) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const res = await getCartAPI();
      const items = res.data.items || [];

      const formatted = items
        .filter(item => item.productId) 
        .map((item) => {
          const primaryImage = item.productId.mainImage || (item.productId.galleryImages && item.productId.galleryImages[0]) || "";
          
          return {
            id: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            originalPrice: item.productId.originalPrice,
            mainImage: primaryImage,
            image: primaryImage, 
            quantity: item.quantity,
            // 🔥 FIX: Extract inStock status directly from the populated product
            inStock: item.productId.inStock ?? true, 
          };
        });

      setCartItems(formatted);
    } catch (err) {
      console.error("Fetch cart error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("userToken");
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product, router) => {
    if (!isLoggedIn()) {
      router.push("/user/login"); 
      return;
    }

    if (!product || !product.id) return;

    const productId = product.id;
    const primaryImage = product.mainImage || product.image || "";

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === productId);

      if (existing) {
        return prev.map((i) =>
          i.id === productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          id: productId,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          mainImage: primaryImage,
          image: primaryImage, 
          quantity: 1,
          inStock: product.inStock ?? true, // Track it locally too
        },
      ];
    });

    try {
      await addToCartAPI({ productId });
    } catch (err) {
      console.error("Add error:", err);
      fetchCart(); 
    }
  };

  const increaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

    try {
      await updateCart({ productId: id, quantity: item.quantity + 1 });
    } catch (err) {
      fetchCart(); 
    }
  };

  const decreaseQty = async (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity - 1;

    setCartItems((prev) =>
      newQty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i))
    );

    try {
      await updateCart({ productId: id, quantity: newQty });
    } catch (err) {
      fetchCart(); 
    }
  };

  const removeItem = async (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await removeFromCart(id);
    } catch (err) {
      fetchCart(); 
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};