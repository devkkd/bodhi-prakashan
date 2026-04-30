"use client";

import React, { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import MyAccSidebar from "@/components/MyAccSidebar";
import { useAuth } from "@/context/AuthContext";
import { ExternalLink, Truck } from "lucide-react"; // Added icons for tracking

const OrdersPage = () => {
  const { logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("Orders fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date cleanly
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper for Status Button Colors
  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "delivered") return "bg-[#00C853] text-white";
    if (s === "shipped") return "bg-blue-500 text-white";
    if (s === "confirmed" || s === "processing") return "bg-[#F47C48] text-white";
    if (s === "cancelled") return "bg-[#111111] text-white";
    return "bg-gray-400 text-white"; // default pending/created
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center pt-20">
        <div className="text-lg font-bold text-gray-500 animate-pulse">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-[180px] md:pt-[230px] pb-20 px-4 lg:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12">
        
        <MyAccSidebar logout={logout} />

        {/* MAIN CONTENT */}
        <div className="flex-1">
          {/* HEADER */}
          <h1 className="text-3xl md:text-[32px] font-extrabold text-black mb-8 tracking-tight">
            Orders / मेरे आदेश
          </h1>
          
          <div className="w-full h-px bg-gray-200 mb-2"></div>

          {/* ORDERS LIST */}
          {orders.length === 0 ? (
            <p className="text-gray-500 py-10">No orders found.</p>
          ) : (
            <div className="flex flex-col">
              {orders.map((order) => (
                <div key={order._id} className="py-10 border-b border-gray-200">
                  
                  {/* ORDER HEADER (ID, Date, Status) */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                    <div>
                      <p className="text-[14px] text-gray-500 font-medium mb-1 uppercase tracking-wider">
                        Order ID : <span className="text-black font-bold">#{order._id.slice(-8)}</span>
                      </p>
                      <p className="text-[14px] text-gray-500 font-medium">
                        Date : <span className="text-black">{formatDate(order.createdAt)}</span>
                      </p>
                    </div>
                    <div>
                      <span className={`inline-block px-6 py-2.5 rounded-full text-[14px] font-bold capitalize tracking-wide shadow-sm ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus || "Confirmed"}
                      </span>
                    </div>
                  </div>

                  {/* ORDER ITEMS */}
                  <div className="flex flex-col gap-6 mb-8">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-5 sm:gap-6">
                        {/* ITEM IMAGE */}
                        <div className="w-[80px] sm:w-[100px] shrink-0 aspect-[2/3] bg-yellow-50 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                          {/* 🔥 FIX: Uses mainImage, falls back to image, and prevents 404 loop */}
                          <img
                            src={item.mainImage || item.image || "https://via.placeholder.com/300x450?text=No+Cover"}
                            alt={item.title || "Product"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/300x450?text=No+Cover";
                            }}
                          />
                        </div>

                        {/* ITEM DETAILS */}
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-[16px] font-bold text-black leading-snug mb-2 pr-4">
                            {item.title || "Unknown Book Title"}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[16px] font-black text-black">
                              ₹{item.price}
                            </span>
                          </div>
                          <p className="text-[14px] text-gray-800 font-medium">
                            QTY : {item.quantity}
                          </p>
                        </div>
                        
                        {/* ITEM TOTAL (Mobile Hidden, Desktop Visible) */}
                        <div className="hidden sm:block text-right font-bold text-[15px] pt-1">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ORDER FOOTER (Address, Payment, Total) */}
                  <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-6">
                    {/* Address & Payment */}
                    <div>
                      <h4 className="text-[14px] font-bold text-black mb-3">Delivery Address</h4>
                      {order.address ? (
                        <>
                          <p className="text-[14px] text-gray-700 font-medium mb-1">
                            {order.address.fullName} | {order.address.phone}
                          </p>
                          <p className="text-[14px] text-gray-600 leading-relaxed max-w-sm">
                            {order.address.addressLine}, {order.address.city}, {order.address.state} - {order.address.pincode}
                          </p>
                        </>
                      ) : (
                        <p className="text-[14px] text-gray-500">No address provided.</p>
                      )}
                      
                      <p className="text-[14px] text-gray-600 mt-4">
                        Payment Status: <span className={`font-bold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-black'}`}>{order.paymentStatus || 'Pending'}</span>
                      </p>
                    </div>

                    {/* Order Total & Tracking */}
                    <div className="md:text-right flex flex-col justify-end items-start md:items-end pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
                      {order.awbCode && (
                        <a 
                          href={order.trackingUrl || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mb-4 flex items-center gap-2 bg-white border border-gray-200 text-black px-4 py-2 rounded-lg font-bold text-[12px] hover:shadow-sm transition-all"
                        >
                          <Truck className="w-4 h-4" /> Track Order <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <p className="text-[14px] text-gray-500 font-medium mb-1">Total Amount</p>
                      <p className="text-2xl sm:text-[28px] font-black text-black">₹{order.totalAmount}</p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* FOOTER PAGINATION */}
          {orders.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-6 text-[14px] text-black font-medium">
              
              {/* Left: Count */}
              <div>
                {orders.length} में से {orders.length} आदेश दिख रहे हैं / Showing Orders {orders.length} of {orders.length}
              </div>

              {/* Center: Load More */}
              <button className="border border-gray-300 rounded-full px-8 py-3 hover:bg-gray-50 transition-colors shadow-sm">
                और आदेश दिखाएँ / Load More Orders
              </button>

              {/* Right: Back to top */}
              <button 
                onClick={handleScrollToTop}
                className="hover:text-[#F89E6E] transition-colors"
              >
                ↑ वापस ऊपर / Back to top
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;