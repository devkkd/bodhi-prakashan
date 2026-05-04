"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { verifyOtp, sendOtp, getDevOtp } from "@/lib/api"; // 🔥 Added sendOtp & getDevOtp
import { useSearchParams, useRouter } from "next/navigation";
import { Copy, CheckCircle2 } from "lucide-react"; // 🔥 Icons for the popup

function VerifyContent() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone");

  // 🔥 DEV POPUP STATE
  const [devOtp, setDevOtp] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // 🔥 FETCH OTP ON INITIAL LOAD (DEV MODE)
  useEffect(() => {
    if (phone) {
      getDevOtp(phone)
        .then((res) => setDevOtp(res.data.otp))
        .catch((err) => console.error("Could not fetch Dev OTP. Ensure backend route exists.", err));
    }
  }, [phone]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const pastedArray = pastedData.split("");
      setOtp(pastedArray);
      inputRefs.current[5].focus(); // Focus last input after paste
    }
  };

  // 🔥 HANDLE COPY TO CLIPBOARD
  const handleCopy = () => {
    if (devOtp) {
      navigator.clipboard.writeText(devOtp);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    }
  };

  // 🔥 HANDLE RESEND LOGIC
  const handleResend = async () => {
    try {
      setOtp(new Array(6).fill("")); // Clear inputs
      const res = await sendOtp({ phone });
      setTimeLeft(30); // Reset timer
      
      // Update popup with new OTP if backend returns it
      if (res.data && res.data.otp) {
        setDevOtp(res.data.otp); 
      } else {
        // Fallback: fetch it again
        const freshOtp = await getDevOtp(phone);
        setDevOtp(freshOtp.data.otp);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to resend OTP");
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      alert("Enter full 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({ phone, otp: otpString });

      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userMobile", phone);

      router.push("/store");
    } catch (err) {
      console.error("Verify failed", err);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const isOtpComplete = otp.join("").length === 6;

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4  relative overflow-hidden">
      
      {/* 🔥 DEV MODE FLOATING POPUP */}
      {devOtp && (
        <div className="fixed top-6 right-6 bg-white p-5 rounded-2xl shadow-xl border border-[#D0C5B7] z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <p className="text-[11px] font-extrabold text-[#F47C48] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F47C48] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F47C48]"></span>
            </span>
            Dev Mode OTP
          </p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black text-gray-900 tracking-[0.2em]">{devOtp}</span>
            <button 
              onClick={handleCopy}
              className={`p-2.5 rounded-xl transition-all ${isCopied ? 'bg-green-100 text-green-600' : 'bg-[#FDFBF7] text-[#F47C48] hover:bg-[#FFE7D1]'}`}
              title="Copy to clipboard"
            >
              {isCopied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-[510px] bg-[#FDFBF7] border border-[#D0C5B7] rounded-[36px] p-8 md:p-12 shadow-sm relative z-10">
        
        <h2 className="text-[24px] md:text-[28px] font-extrabold text-black mb-3">
          Code sent / कोड भेज दिया गया
        </h2>
        
        <p className="text-[16px] text-gray-800 mb-5 leading-snug">
          A 6-digit code has been sent to +91 - {phone || "XXXXX XXXXX"} <br />
        </p>

        <div className="mb-8">
          <label className="block text-[15px] font-bold text-black mb-3">
            One-time code / एक बार का कोड
          </label>
          
          <div className="flex gap-3 sm:gap-4 w-full" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 h-12 sm:w-12 sm:h-14 border-b border-[#D0C5B7] bg-transparent text-center text-xl font-bold text-black focus:outline-none focus:border-black transition-colors"
              />
            ))}
          </div>
        </div>

        {/* 🔥 UPDATED RESEND UI */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[16px] text-black">
            Didn't receive it?
          </p>
          {timeLeft > 0 ? (
            <span className="font-bold text-gray-500">Wait {timeLeft}s</span>
          ) : (
            <button 
              onClick={handleResend}
              className="font-bold text-[#F47C48] hover:text-[#d36435] transition-colors border-b border-transparent hover:border-[#d36435]"
            >
              Resend OTP
            </button>
          )}
        </div>

        <div className="flex justify-center mb-5">
          <button
            onClick={handleVerify}
            disabled={loading || !isOtpComplete}
            className={`px-12 py-3.5 w-full rounded-full font-bold text-[16px] text-black transition-all ${
              isOtpComplete 
                ? "bg-[#FFAE79] hover:bg-[#ff9d61] shadow-sm hover:-translate-y-0.5" 
                : "bg-[#BCAFA0] cursor-not-allowed opacity-80"
            }`}
          >
            {loading ? "Verifying..." : "Verify / सत्यापित करें"}
          </button>
        </div>

        <p className="text-[14px] text-center text-black opacity-90">
          Your number is never shared.
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-bold text-[#F47C48]">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}