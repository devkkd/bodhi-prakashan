"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check if token exists in localStorage
    const token = localStorage.getItem("adminToken");

    if (!token) {
      // 2. If no token, redirect to login page immediately
      router.replace("/admin/login");
    } else {
      // 3. If token exists, allow the page to render
      setIsAuthorized(true);
    }
  }, [router]);

  // Prevent "flash of content" while checking authentication
  if (!isAuthorized) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#FFF6ED] text-[#C58A5A]">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-bold text-lg tracking-wide">Verifying Admin Access...</p>
      </div>
    );
  }

  // If authorized, render the Admin Layout
  return (
    <div className="flex h-screen overflow-hidden">
      
      <AdminSidebar />

      <div className="flex-1 bg-[#FFF6ED] min-h-screen">
        
        <AdminHeader />

        <div className="overflow-x-auto h-[88vh] p-6">
          {children}
        </div>

      </div>
    </div>
  );
}