"use client"
import React from 'react';

const Newsletter = () => {
  return (
    <section className="w-full bg-[#FFF1E0] py-10 sm:py-12 md:py-16 ">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Top Label */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-block border-b-2 border-[#FF7C26] pb-1">
            <span className="text-[#FF7C26] text-[12px] sm:text-[13px] md:text-sm font-bold tracking-wider uppercase">
              Newsletter Invite
            </span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 px-2 sm:px-4">
          <h2 className="text-[20px] sm:text-2xl md:text-3xl lg:text-[36px] font-extrabold text-black mb-3 sm:mb-4 tracking-tight leading-snug">
            हफ्ते में एक बार | एक किताब की बात | जब मन हो तो unsubscribe कर देना
          </h2>
          <h3 className="text-[17px] sm:text-xl md:text-2xl lg:text-[32px] font-extrabold text-black tracking-tight leading-snug">
            "Once a week. One book. Leave whenever you like."
          </h3>
        </div>

        {/* Bottom Section: Text & Form */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
          
          {/* Left Text */}
          <div className="text-center lg:text-left flex-1 px-2">
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium mb-1 md:mb-2 leading-relaxed">
              A Short Note About A Book Worth Your Time - Straight To Your Inbox.
            </p>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-medium">
              Leave Whenever You Like.
            </p>
          </div>

          {/* Right Input & Button */}
          <form 
            className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 sm:gap-4 flex-shrink-0 px-2 sm:px-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="text-gray-800 w-full sm:w-[280px] md:w-[320px] lg:w-[380px] px-5 sm:px-6 py-3.5 md:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-[#FF7C26]/20 text-[14px] md:text-[15px] shadow-sm transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#FFAE79] hover:bg-[#ff9e5e] text-black font-bold text-[14px] md:text-[15px] py-3.5 md:py-4 px-6 sm:px-8 rounded-full transition-colors duration-200 whitespace-nowrap shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFAE79] focus:ring-offset-2 focus:ring-offset-[#FFF1E0]"
            >
              Subscribe &rarr;
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};

export default Newsletter;