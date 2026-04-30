'use client';

import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/api";
import { 
  Users, Search, Filter, Mail, Phone, MapPin, 
  Calendar, Loader2, UserX, Eye, ShoppingCart 
} from "lucide-react";
import Link from "next/link";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all"); // 'all', 'with_address', 'number_only', 'has_cart'

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getAllUsers();
      const fetchedUsers = res.data || [];
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 Handle Filtering & Searching
  useEffect(() => {
    let result = users;

    // 1. Apply Dropdown Filter
    if (userFilter === "with_address") {
      result = result.filter(u => u.addresses && u.addresses.length > 0);
    } else if (userFilter === "number_only") {
      result = result.filter(u => !u.addresses || u.addresses.length === 0);
    } else if (userFilter === "has_cart") {
      // 🔥 NEW: Filter users who have items in their cart
      result = result.filter(u => u.cartItemsCount > 0);
    }

    // 2. Apply Search Filter
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      result = result.filter(u => {
        const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();
        const phone = u.phone || "";
        const email = (u.email || "").toLowerCase();
        
        return fullName.includes(q) || phone.includes(q) || email.includes(q);
      });
    }

    setFilteredUsers(result);
  }, [searchTerm, userFilter, users]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10 font-sans text-[#7a4f2b]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Users className="w-8 h-8 text-[#C58A5A]" />
              Users Management
            </h1>
            <p className="text-[#C58A5A] mt-2 font-medium">View and filter registered customers.</p>
          </div>
          <div className="bg-[#FFF6ED] border border-[#FFE7D1] px-5 py-2.5 rounded-xl font-bold shadow-sm text-center">
            <span className="block text-xs text-[#C58A5A] uppercase tracking-wider mb-0.5">Total Users</span>
            <span className="text-xl text-gray-900">{users.length}</span>
          </div>
        </div>

        {/* CONTROLS (Search & Filter) */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Bar */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#C58A5A]" />
            </div>
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FFF6ED] border border-[#FFE7D1] text-gray-900 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-auto flex items-center gap-3">
            <Filter className="h-5 w-5 text-[#C58A5A] hidden sm:block" />
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full md:w-auto bg-[#FFF6ED] border border-[#FFE7D1] text-[#7a4f2b] rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] cursor-pointer"
            >
              <option value="all">All Users</option>
              <option value="with_address">Has Saved Address</option>
              <option value="number_only">Phone Number Only</option>
              <option value="has_cart">Has Items in Cart</option> {/* 🔥 NEW FILTER */}
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#FFE7D1] bg-[#FFF6ED] flex justify-between items-center">
            <h2 className="text-lg font-bold">Customer Directory</h2>
            <span className="bg-[#FFD3AC] text-[#7a4f2b] text-xs font-bold px-3 py-1 rounded-full">
              Showing {filteredUsers.length}
            </span>
          </div>

          {isLoading ? (
            <div className="p-16 flex flex-col justify-center items-center text-[#C58A5A]">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="font-bold">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FFF6ED] rounded-full flex items-center justify-center mb-4">
                <UserX className="w-8 h-8 text-[#C58A5A]" />
              </div>
              <p className="text-lg font-bold text-gray-800">No users found</p>
              <p className="text-[#C58A5A]">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[950px]">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-[#C58A5A] bg-gray-50/50">
                    <th className="px-6 py-4 font-bold">Customer Info</th>
                    <th className="px-6 py-4 font-bold">Contact</th>
                    <th className="px-6 py-4 font-bold">Status & Cart</th>
                    <th className="px-6 py-4 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FFE7D1]">
                  {filteredUsers.map((user) => {
                    const hasAddress = user.addresses && user.addresses.length > 0;
                    const defaultAddress = hasAddress ? user.addresses.find(a => a.isDefault) || user.addresses[0] : null;
                    const hasCart = user.cartItemsCount > 0;

                    return (
                      <tr key={user._id} className="hover:bg-[#FFF6ED]/30 transition-colors">
                        
                        {/* Name Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFE8CC] flex items-center justify-center text-[#7a4f2b] font-black shrink-0">
                              {user.firstName ? user.firstName.charAt(0).toUpperCase() : "#"}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-[15px] capitalize">
                                {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "Unnamed User"}
                              </p>
                              <p className="text-xs font-bold text-[#C58A5A] flex items-center gap-1 mt-0.5">
                                <Calendar className="w-3 h-3" /> Joined {formatDate(user.createdAt)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                              <Phone className="w-3.5 h-3.5 text-[#C58A5A]" />
                              {user.phone}
                            </div>
                            {user.email && (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail className="w-3.5 h-3.5" />
                                {user.email}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Address Status & Cart Status */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2 items-start">
                            {/* Address Badge */}
                            {hasAddress ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-green-50 text-green-700 border border-green-100">
                                <MapPin className="w-3 h-3" /> {user.addresses.length} Saved
                              </span>
                            ) : (
                              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gray-100 text-gray-500 border border-gray-200">
                                No Addresses
                              </span>
                            )}
                            
                            {/* 🔥 Cart Badge */}
                            {hasCart && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#FFE8CC] text-[#7a4f2b] border border-[#FCA57D]">
                                <ShoppingCart className="w-3 h-3" /> {user.cartItemsCount} in Cart
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Action Column */}
                        <td className="px-6 py-4 text-center">
                          <Link href={`/admin/users/${user._id}`}>
                            <button className="inline-flex items-center gap-2 bg-[#FFF6ED] hover:bg-[#FFE7D1] text-[#7a4f2b] px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm border border-[#FFE7D1]">
                              <Eye className="w-4 h-4" /> View Details
                            </button>
                          </Link>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}