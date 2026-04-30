'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/lib/api";
import { 
  ArrowLeft, User as UserIcon, Mail, Phone, 
  MapPin, Calendar, CheckCircle, Home, Loader2,
  ShoppingCart, Package, IndianRupee // 🔥 Added new icons
} from "lucide-react";

export default function UserDetailsAdmin() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        alert("Failed to load user. They might have been deleted.");
        router.push("/admin/users");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id, router]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center text-[#C58A5A]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold text-lg">Loading User Profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10 font-sans text-[#7a4f2b]">
      <div className="max-w-5xl mx-auto pb-20">
        
        {/* BACK BUTTON */}
        <button 
          onClick={() => router.push("/admin/users")}
          className="flex items-center gap-2 text-[#C58A5A] hover:text-[#7a4f2b] font-bold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Users List
        </button>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-8 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
          
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#FFE8CC] flex flex-col items-center justify-center text-[#7a4f2b] font-black text-4xl shrink-0 shadow-inner">
            {user.firstName ? user.firstName.charAt(0).toUpperCase() : <UserIcon className="w-12 h-12 opacity-50" />}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold text-gray-900 capitalize tracking-tight">
                {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "Unnamed User"}
              </h1>
              {user.isVerified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-100">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            
            <p className="text-sm font-bold text-[#C58A5A] uppercase tracking-widest mb-6">User ID: {user._id}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-[#FFF6ED] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C58A5A]" />
                </div>
                {user.phone}
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-[#FFF6ED] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#C58A5A]" />
                </div>
                {user.email || "No email provided"}
              </div>
              <div className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-[#FFF6ED] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#C58A5A]" />
                </div>
                Joined: {formatDate(user.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESSES SECTION */}
        <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2 mb-6 mt-12">
          <MapPin className="w-6 h-6 text-[#C58A5A]" /> Saved Addresses ({user.addresses?.length || 0})
        </h2>

        {(!user.addresses || user.addresses.length === 0) ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-12 text-center">
            <MapPin className="w-12 h-12 text-[#FFD3AC] mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-800">No addresses saved</p>
            <p className="text-[#C58A5A]">This user hasn't added a delivery address yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.addresses.map((address) => (
              <div key={address._id} className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-6 relative overflow-hidden group hover:border-[#C58A5A] hover:shadow-md transition-all">
                
                {address.isDefault && (
                  <div className="absolute top-0 right-0 bg-[#FCA57D] text-black text-[10px] font-extrabold uppercase px-3 py-1 rounded-bl-xl shadow-sm">
                    Default
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFF6ED] flex items-center justify-center shrink-0 mt-1">
                    <Home className="w-5 h-5 text-[#C58A5A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-1 capitalize">
                      {address.fullName}
                    </h3>
                    <p className="text-sm font-bold text-[#C58A5A] mb-3">{address.phone}</p>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm pr-4">
                      {address.addressLine}<br/>
                      {address.city}, {address.state}<br/>
                      <span className="font-bold text-gray-800 mt-1 block">PIN: {address.pincode}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 NEW: CART SECTION */}
        <div className="flex items-center justify-between mt-12 mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-[#C58A5A]" /> Active Cart
          </h2>
          {user.cart && user.cart.length > 0 && (
             <span className="bg-[#FFF6ED] border border-[#FFE7D1] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
               {user.cart.length} Items
             </span>
          )}
        </div>

        {(!user.cart || user.cart.length === 0) ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-[#FFD3AC] mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-800">Cart is empty</p>
            <p className="text-[#C58A5A]">This user does not have any items in their cart right now.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
            <div className="divide-y divide-[#FFE7D1]">
              {user.cart.map((item, index) => {
                const product = item.productId;
                
                // If product was deleted from DB but is still in cart
                if (!product) {
                  return (
                    <div key={index} className="p-6 flex items-center gap-4 bg-gray-50 text-gray-500 italic">
                      <Package className="w-8 h-8 opacity-50" />
                      <p>Product no longer exists in database</p>
                    </div>
                  );
                }

                // Extract image securely
                const displayImage = product.mainImage || (product.galleryImages?.[0]) || "/placeholder.jpg";

                return (
                  <div key={index} className="p-4 md:p-6 flex items-center gap-4 md:gap-6 hover:bg-[#FFF6ED]/50 transition-colors">
                    {/* Product Image */}
                    <div className="w-16 h-20 md:w-20 md:h-24 shrink-0 bg-[#FFF6ED] rounded-xl overflow-hidden border border-[#FFE7D1] flex items-center justify-center p-1">
                      <img 
                        src={displayImage} 
                        alt={product.title}
                        className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
                        onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm font-bold text-[#C58A5A]">
                        <span>Qty: {item.quantity}</span>
                        <span className="flex items-center">
                          <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
                          {product.price} <span className="text-gray-400 font-medium ml-1">each</span>
                        </span>
                      </div>
                    </div>

                    {/* Total Price for this item */}
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Subtotal</p>
                      <p className="text-xl font-black text-gray-900 flex items-center justify-end">
                        <IndianRupee className="w-4 h-4 mr-0.5" />
                        {product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Cart Total Summary */}
            <div className="bg-[#FFF6ED] border-t border-[#FFE7D1] p-6 flex justify-between items-center">
              <span className="text-sm font-extrabold text-[#C58A5A] uppercase tracking-widest">Estimated Cart Value</span>
              <span className="text-2xl font-black text-[#7a4f2b] flex items-center">
                <IndianRupee className="w-5 h-5 mr-0.5" />
                {user.cart.reduce((total, item) => total + ((item.productId?.price || 0) * item.quantity), 0)}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}