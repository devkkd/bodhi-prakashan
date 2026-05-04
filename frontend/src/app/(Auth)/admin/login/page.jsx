"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { ShieldCheck, User, Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload on enter
    setError(null);
    setIsLoading(true);

    try {
      const res = await API.post("/admin/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      router.push("/admin");
    } catch (err) {
      console.error("Admin login failed", err);
      setError(err.response?.data?.message || "Invalid credentials. Access denied.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 ">
      
      <div className="w-full max-w-[420px] bg-white border border-[#FFE7D1] rounded-[32px] p-8 md:p-10 shadow-sm relative overflow-hidden">
        
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FFF6ED] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FFF6ED] rounded-full blur-3xl opacity-60"></div>

        <div className="relative z-10">
          
          {/* Header Icon */}
          <div className="w-16 h-16 bg-[#FFF6ED] rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[#FFE7D1] shadow-inner transform rotate-3">
            <ShieldCheck className="w-8 h-8 text-[#C58A5A] -rotate-3" />
          </div>

          <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">
            Admin Portal
          </h2>
          <p className="text-[14px] text-center text-[#C58A5A] font-medium mb-8">
            Authorized personnel only
          </p>

          {/* Error Message UI */}
          {error && (
            <div className="mb-6 flex items-start gap-2 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold animate-in fade-in zoom-in-95 duration-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[#C58A5A]" />
                </div>
                <input
                  type="text"
                  placeholder="admin@bodhi.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-[#FFF6ED] border border-[#FFE7D1] text-gray-900 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all font-medium placeholder-[#C58A5A]/50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[#C58A5A]" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#FFF6ED] border border-[#FFE7D1] text-gray-900 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all font-medium placeholder-[#C58A5A]/50 tracking-widest"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className={`w-full bg-[#7a4f2b] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-[#5e3c20] transition-all flex items-center justify-center gap-2 mt-8 shadow-md disabled:opacity-70 disabled:cursor-not-allowed ${isLoading ? 'scale-[0.98]' : 'hover:-translate-y-0.5'}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Secure Login →"
              )}
            </button>
          </form>

        </div>
      </div>
      
      {/* Footer Text */}
      <p className="mt-8 text-sm font-medium text-[#C58A5A] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4" /> Secure Admin Gateway
      </p>

    </div>
  );
}