"use client";

import React, { useState } from "react";
import { sendOtp } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    // 🔴 validation
    if (phone.length !== 10) {
      alert("Enter valid 10 digit number");
      return;
    }

    try {
      setLoading(true);

      await sendOtp({ phone });

      // ✅ correct route
      router.push(`/user/verify?phone=${phone}`);
    } catch (err) {
      console.error("Send OTP failed", err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Check if phone number is exactly 10 digits
  const isPhoneValid = phone.length === 10;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Main Login Card */}
      <div className="w-full max-w-[510px] bg-[#FDFBF7] border border-[#D0C5B7] rounded-[36px] p-4 md:p-8 shadow-sm">
        
        <h2 className="text-[28px] font-extrabold text-black mb-3">Sign In</h2>
        
        <p className="text-[18px] md:text-[20px] font-medium text-black mb-2">
          वापस आए? अच्छा लगा / Welcome Back, Reader
        </p>
        
        <p className="text-[16px] text-gray-800 mb-5 leading-snug">
          Sign in to see your orders, saved books, and reading list.
        </p>

        {/* Input Area */}
        <div className="mb-5">
          <label className="block text-[15px] font-bold text-black mb-3">
            Mobile Number / मोबाइल नंबर
          </label>
          <input
            type="tel"
            placeholder="Your 10-digit number / आपका मोबाइल नंबर"
            value={phone}
            // Only allow numbers and limit to 10 digits
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full border-b border-[#D0C5B7] bg-transparent pb-3 text-[16px] text-black focus:outline-none focus:border-black transition-colors placeholder-gray-400"
          />
        </div>

        {/* Terms & Privacy */}
        <p className="text-[16px] text-black mb-5 leading-relaxed">
          By proceeding, you are agreeing to our <span className="font-bold">T&C</span> and <br className="hidden sm:block" />
          <span className="font-bold">Privacy Policy.</span>
        </p>

        {/* Dynamic Action Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSendOtp}
            disabled={loading || !isPhoneValid}
            className={`px-10 py-3.5 rounded-full font-bold text-[16px] text-black transition-all flex items-center justify-center gap-2 ${
              isPhoneValid 
                ? "bg-[#FFAE79] hover:bg-[#ff9d61] shadow-sm" 
                : "bg-[#BCAFA0] cursor-not-allowed"
            }`}
          >
            {loading ? "Sending..." : "प्रवेश करें / Sign in →"}
          </button>
        </div>

        {/* Security Footer */}
        <p className="text-[14px] text-center text-black leading-relaxed opacity-90">
          आपका नंबर सुरक्षित है | Your number is never shared, never sold.<br/>
          Used only to keep your account safe.
        </p>
        
      </div>

      {/* Outside Footer Text */}
      <div className="mt-5 text-[#F47C48] text-[18px] font-medium tracking-wide">
        पढ़ते रहो । / Keep reading.
      </div>

    </div>
  );
}