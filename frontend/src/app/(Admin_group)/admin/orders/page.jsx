"use client";

import React, { useEffect, useState } from "react";
import { getAdminOrders, updateOrderStatus } from "@/lib/api";
import { Briefcase, Loader2, MapPin, Package, Calendar } from "lucide-react";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getAdminOrders();
      setOrders(res.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      // Optimistically update UI for a snappy feel
      setOrders(orders.map(order => 
        order._id === id ? { ...order, orderStatus: status } : order
      ));
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update status");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10 font-sans text-[#7a4f2b]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-[#C58A5A]" />
              Order Management
            </h1>
            <p className="text-[#C58A5A] mt-2 font-medium">
              View, track, and update customer orders across your store.
            </p>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
          
          <div className="px-6 py-5 border-b border-[#FFE7D1] bg-[#FFF6ED] flex justify-between items-center">
            <h2 className="text-lg font-bold">All Orders</h2>
            <span className="bg-[#FFD3AC] text-[#7a4f2b] text-xs font-bold px-3 py-1 rounded-full">
              {orders.length} Total
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#C58A5A]">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-semibold">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-16 text-center">
              <Package className="w-16 h-16 text-[#FFD3AC] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Found</h3>
              <p className="text-[#C58A5A]">You don't have any customer orders yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-[#FFE7D1] text-[13px] uppercase tracking-wider text-gray-500 font-bold">
                    <th className="p-5">Order Info</th>
                    <th className="p-5">Customer Details</th>
                    <th className="p-5">Items Summary</th>
                    <th className="p-5">Total</th>
                    <th className="p-5">Status Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE7D1]">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#FFF6ED]/50 transition-colors group">
                      
                      {/* ORDER ID & DATE */}
                      <td className="p-5 align-top">
                        <p className="font-mono text-sm font-bold text-gray-900 mb-1.5">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>

                      {/* CUSTOMER INFO */}
                      <td className="p-5 align-top">
                        <p className="font-bold text-gray-900 mb-1">{order.address?.fullName || "N/A"}</p>
                        <p className="text-sm text-gray-500 mb-2">{order.address?.phone || "No Phone"}</p>
                        <div className="flex items-start gap-1.5 text-xs text-gray-500 max-w-[220px] whitespace-normal leading-snug">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C58A5A]" />
                          <span>
                            {order.address ? `${order.address.addressLine || ""}, ${order.address.city || ""}` : "No address provided"}
                          </span>
                        </div>
                      </td>

                      {/* ITEMS */}
                      <td className="p-5 align-top">
                        <div className="flex flex-col gap-2 max-w-[250px]">
                          {order.items?.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                              <span className="font-medium text-gray-800 truncate pr-2" title={item.title}>
                                {item.title || "No title"}
                              </span>
                              <span className="text-gray-500 shrink-0">
                                {item.quantity} × ₹{item.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* TOTAL */}
                      <td className="p-5 align-top">
                        <p className="text-lg font-black text-[#7a4f2b]">
                          ₹{order.totalAmount || order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0)}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.paymentStatus || 'Pending'}
                        </span>
                      </td>

                      {/* STATUS DROPDOWN */}
                      <td className="p-5 align-top">
                        <select
                          value={order.orderStatus || "created"}
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className={`text-sm font-bold border-2 rounded-lg px-3 py-2 outline-none cursor-pointer transition-colors w-[140px] ${
                            order.orderStatus === 'delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                            order.orderStatus === 'shipped' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                            order.orderStatus === 'cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                            'bg-[#FFF6ED] border-[#FFD3AC] text-[#7a4f2b]'
                          }`}
                        >
                          <option value="created">Created</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};