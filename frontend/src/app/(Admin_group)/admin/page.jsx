'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  getCategories, 
  getSubCategories, 
  getProducts, 
  getAdminOrders,
  getAllUsers,
  getAdminInquiries // 🔥 IMPORT ADDED
} from "@/lib/api";
import { 
  LayoutDashboard, Package, FolderTree, Folder, 
  ShoppingCart, Users, MessageSquare, ArrowRight, Loader2, IndianRupee
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    subCategories: 0,
    orders: 0,
    users: 0,
    inquiries: 0 // 🔥 Will now be dynamically updated
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // 🔥 Fetch all data in parallel, now including Inquiries
        const [prodRes, catRes, subRes, ordRes, userRes, inqRes] = await Promise.all([
          getProducts().catch(() => ({ data: [] })),
          getCategories().catch(() => ({ data: [] })),
          getSubCategories().catch(() => ({ data: [] })),
          getAdminOrders().catch(() => ({ data: [] })),
          getAllUsers().catch(() => ({ data: [] })),
          getAdminInquiries().catch(() => ({ data: [] })) // 🔥 Added fetch
        ]);

        const productsData = prodRes.data || [];
        const categoriesData = catRes.data || [];
        const subCategoriesData = subRes.data || [];
        const ordersData = ordRes.data || [];
        const usersData = userRes.data || []; 
        const inquiriesData = inqRes.data || []; // 🔥 Extracted

        // Calculate only "new" (unread) inquiries for the dashboard stat
        const newInquiriesCount = inquiriesData.filter(inq => inq.status === 'new').length;

        // Update Counts
        setStats({
          products: productsData.length,
          categories: categoriesData.length,
          subCategories: subCategoriesData.length,
          orders: ordersData.length,
          users: usersData.length,
          inquiries: newInquiriesCount // 🔥 Now uses real DB count
        });

        // Get only the 5 most recent orders
        setRecentOrders(ordersData.slice(0, 5));

      } catch (err) {
        console.error("Dashboard Data Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper for Date formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  // Helper for Status Badge
  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    switch (s) {
      case "delivered": return "bg-green-100 text-green-700 border-green-200";
      case "shipped": return "bg-blue-100 text-blue-700 border-blue-200";
      case "confirmed":
      case "processing": return "bg-orange-100 text-orange-700 border-orange-200";
      case "cancelled": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-[#FFF6ED] text-[#C58A5A] border-[#FFE7D1]";
    }
  };

  const statCards = [
    { title: "Total Products", count: stats.products, icon: Package, link: "/admin/products" },
    { title: "Total Orders", count: stats.orders, icon: ShoppingCart, link: "/admin/orders" },
    { title: "Categories", count: stats.categories, icon: Folder, link: "/admin/categories" },
    { title: "SubCategories", count: stats.subCategories, icon: FolderTree, link: "/admin/subcategories" },
    { title: "Registered Users", count: stats.users, icon: Users, link: "/admin/users" },
    { title: "New Inquiries", count: stats.inquiries, icon: MessageSquare, link: "/admin/inquiries" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-[#C58A5A]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10  text-[#7a4f2b]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-[#C58A5A]" />
            Admin Dashboard
          </h1>
          <p className="text-[#C58A5A] mt-2 font-medium">Welcome back! Here is an overview of your store.</p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link href={card.link} key={index}>
                <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-6 group hover:shadow-md hover:border-[#C58A5A] transition-all duration-300 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF6ED] flex items-center justify-center text-[#C58A5A] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#C58A5A] transition-colors -translate-x-2 group-hover:translate-x-0" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">{card.count}</h3>
                    <p className="text-sm font-bold text-[#C58A5A] uppercase tracking-wider mt-1">{card.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* RECENT ORDERS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#FFE7D1] bg-[#FFF6ED] flex justify-between items-center">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#C58A5A]" />
              Recent Orders
            </h2>
            <Link href="/admin/orders">
              <button className="text-sm font-bold text-[#C58A5A] hover:text-[#7a4f2b] transition-colors">
                View All →
              </button>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-10 text-center text-[#C58A5A] font-medium">
              No recent orders found.
            </div>
          ) : (
            <div className="divide-y divide-[#FFE7D1] overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-400 bg-gray-50/50">
                    <th className="px-6 py-4 font-bold">Order ID</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Customer</th>
                    <th className="px-6 py-4 font-bold">Amount</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE7D1]">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-[#FFF6ED]/50 transition-colors">
                      <td className="px-6 py-4">
                        <Link href={`/admin/orders/${order._id}`} className="font-bold text-[#7a4f2b] hover:underline">
                          #{order._id.slice(-8)}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{order.address?.fullName || "N/A"}</p>
                        <p className="text-xs text-gray-500">{order.address?.city}</p>
                      </td>
                      <td className="px-6 py-4 font-black text-gray-900 flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5 text-gray-500" />
                        {order.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(order.orderStatus)}`}>
                          {order.orderStatus || "New"}
                        </span>
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
}