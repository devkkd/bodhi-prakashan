"use client";

import React, { useState } from "react";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import { submitContactForm } from "@/lib/api"; 
import { CheckCircle2, AlertCircle } from "lucide-react"; // 🔥 Imported icons for better UI

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    city: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.phone || !form.email || !form.message) {
      setFeedback({ type: "error", text: "Please fill in all the required fields." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await submitContactForm(form);
      setFeedback({ type: "success", text: "Thank you! Your message has been safely received." });
      setForm({ firstName: "", lastName: "", phone: "", email: "", subject: "", city: "", message: "" });
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", text: err.response?.data?.message || "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pt-[160px]">
        
        {/* --- PAGE HEADER --- */}
        <div className="w-full bg-[#FFE8CC] py-8 md:py-12 border-b border-orange-900/10">
          <h1 className="text-center text-3xl md:text-[40px] font-extrabold text-black tracking-tight">
            Contact Us
          </h1>
        </div>

        {/* --- INTRO SECTION --- */}
        <div className="max-w-[800px] mx-auto px-4 text-center mt-16 mb-16 md:mb-24">
          <h2 className="text-3xl md:text-[36px] font-extrabold text-[#F89E6E] mb-6">
            बात करें / Let's talk
          </h2>
          <div className="text-[15px] md:text-[16px] text-black font-medium leading-relaxed">
            <p>We are a small team - which means when you write to us, a real person reads it.</p>
            <p>No ticket numbers. No automated responses.</p>
            <p>Just a reply from someone who cares about your order as much as you do.</p>
          </div>
        </div>

        {/* --- MAIN CONTACT GRID --- */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
            
            {/* LEFT COLUMN: WAYS TO REACH US */}
            <div className="flex flex-col pr-0 lg:pr-16 lg:py-8">
              <h2 className="text-3xl md:text-[36px] font-extrabold text-black mb-12 tracking-tight">
                Ways to reach us
              </h2>

              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-extrabold text-black">ईमेल / Email</h3>
                  <div className="text-[15px] text-gray-800 font-medium leading-relaxed">
                    <p>Email : bodhiprakashan@gmail.com</p>
                    <p>We reply within 24 hours - usually sooner.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-extrabold text-black">फ़ोन / Phone</h3>
                  <div className="text-[15px] text-gray-800 font-medium leading-relaxed">
                    <p>+91 - 9660520078</p>
                    <p>Monday to Saturday · 10am - 6pm IST</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-extrabold text-black">पता / Address</h3>
                  <div className="text-[15px] text-gray-800 font-medium leading-relaxed space-y-4">
                    <p>14, केसर नगर A, केसर चौराहा, मुहाना मंडी रोड, केसर स्कूल मोहनपुरा बालाजी रोड गेट, जयपुर, राजस्थान</p>
                    <p>14, Kesar Nagar A, Kesar Chauraha, Muhana Mandi Road, Kesar School Mohanpura Balaji Road Gate, Jaipur, Rajasthan</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-[15px] font-extrabold text-black">इंस्टाग्राम / Instagram</h3>
                  <div className="text-[15px] text-gray-800 font-medium leading-relaxed">
                    <p>@bodhisahitya</p>
                    <p>For book recommendations, new arrivals, and the occasional reading thought.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM OR SUCCESS MESSAGE */}
            <div className="bg-[#FFF1E0] p-8 md:p-12 lg:p-16 rounded-sm min-h-[600px] flex flex-col justify-center">
              
              {/* 🔥 SUCCESS STATE UI */}
              {feedback?.type === "success" ? (
                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-green-500" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-black mb-4">Message Sent!</h2>
                  <p className="text-gray-700 font-medium text-[16px] max-w-sm mb-8 leading-relaxed">
                    Thank you for reaching out. We have safely received your inquiry and our team will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setFeedback(null)}
                    className="text-[#F89E6E] font-bold hover:text-[#f49368] transition-colors border-b-2 border-transparent hover:border-[#f49368] pb-0.5"
                  >
                    ← Send another message
                  </button>
                </div>
              ) : (
                
                /* 🔥 REGULAR FORM STATE */
                <>
                  <h2 className="text-2xl md:text-[28px] font-extrabold text-black mb-12 tracking-tight">
                    Contact Form / संपर्क करें प्रपत्र
                  </h2>

                  <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">First Name / पहला नाम *</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your first name" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">Last Name / अंतिम नाम *</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your last name" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">Mobile / WhatsApp *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="Your 10-digit number" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">Email Address / ईमेल पता *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="Where we'll reach you" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">Subject / विषय *</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          required
                          placeholder="What is this about?" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-medium text-black">City / शहर *</label>
                        <input 
                          type="text" 
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          placeholder="Your city" 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label className="text-[13px] font-medium text-black">Message / संदेश *</label>
                        <input 
                          type="text" 
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us what's on your mind..." 
                          className="w-full bg-transparent border-b border-gray-300 pb-2 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#F89E6E] transition-colors" 
                        />
                      </div>

                    </div>

                    {/* 🔥 ERROR FEEDBACK UI */}
                    {feedback?.type === "error" && (
                      <div className="flex items-center gap-3 p-4 rounded-xl text-sm font-bold bg-red-50 border border-red-100 text-red-600 animate-in fade-in slide-in-from-bottom-2">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        {feedback.text}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`bg-[#FCA57D] hover:bg-[#f49368] text-black px-8 py-3.5 rounded-full text-[14px] font-extrabold transition-all tracking-wide ${isSubmitting ? 'opacity-70 cursor-wait scale-95' : 'hover:-translate-y-0.5 shadow-sm'}`}
                      >
                        {isSubmitting ? 'Sending... / भेज रहा है...' : 'Send message / भेजें ➔'}
                      </button>
                    </div>

                  </form>
                </>
              )}
            </div>

          </div>
        </div>

      </div>

      <Features />
      <Newsletter />
    </>
  );
}