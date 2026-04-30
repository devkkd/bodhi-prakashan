"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { verifyOtp } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyContent() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone");

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
      inputRefs.current[5].focus();
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
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[510px] bg-[#FDFBF7] border border-[#D0C5B7] rounded-[36px] p-8 md:p-12 shadow-sm">
        
        <h2 className="text-[24px] md:text-[28px] font-extrabold text-black mb-3">
          Code sent / कोड भेज दिया गया
        </h2>
        
        <p className="text-[16px] text-gray-800 mb-5 leading-snug">
          A 6-digit code has been sent to +91 - {phone || "XXXXX XXXXX"} <br />
          Didn't receive it? Resend in {timeLeft} seconds.
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

        <p className="text-[16px] text-black mb-6">
          Resend OTP in <span className="font-bold">{timeLeft} Sec.</span>
        </p>

        <div className="flex justify-center mb-5">
          <button
            onClick={handleVerify}
            disabled={loading || !isOtpComplete}
            className={`px-12 py-3.5 rounded-full font-bold text-[16px] text-black transition-all ${
              isOtpComplete 
                ? "bg-[#FFAE79] hover:bg-[#ff9d61]" 
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
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}