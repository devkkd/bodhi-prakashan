"use client";

import React from "react";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    /* Change 1: Use h-fit and flex-col with top padding to ensure it stays clear of header/footer */
    <div className="w-full bg-[#fcf9f5] flex flex-col items-center justify-start px-4 pt-[200px] pb-24">
      
      {/* Change 2: Reduced max-width and internal padding for a tighter, "less big" card */}
      <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 max-w-[380px] w-full text-center border border-gray-50">
        
        {/* --- ANIMATED SUCCESS ICON --- */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center animate-bounce">
            <svg 
              className="w-8 h-8 text-emerald-500" 
              fill="none"
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* --- TITLE & SUBTITLE --- */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-black text-black tracking-tight mb-2">
            ऑर्डर सफल! <br />
            <span className="text-[#F89E6E]">Order Confirmed</span>
          </h1>
          <p className="text-gray-400 font-medium text-[13px] leading-relaxed px-2">
            Your payment was successful. We've sent a confirmation email to you.
          </p>
        </div>

        {/* --- DECORATIVE LINE --- */}
        <div className="flex justify-center gap-1 mb-8">
          <div className="h-1 w-6 bg-[#FCA57D] rounded-full"></div>
          <div className="h-1 w-1.5 bg-[#FCA57D] rounded-full opacity-50"></div>
        </div>

        {/* --- ACTIONS --- */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/store")}
            className="w-full bg-[#FCA57D] hover:bg-[#f49368] text-black py-3.5 rounded-full font-black text-[14px] shadow-md shadow-[#fca57d]/20 transition-all active:scale-95"
          >
            Continue Shopping →
          </button>
          
          <button
            onClick={() => router.push("/account/orders")}
            className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-500 py-3.5 rounded-full font-bold text-[13px] transition-all"
          >
            Track Orders
          </button>
        </div>

        {/* --- FOOTER NOTE --- */}
        <p className="mt-8 text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
          Happy Reading!
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;