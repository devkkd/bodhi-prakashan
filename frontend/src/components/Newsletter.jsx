"use client"
import React from 'react';

const Newsletter = () => {
  return (
    <section className="w-full bg-[#FFF1E0] py-8 md:py-12 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col items-center">
        
        {/* Top Label */}
        <div className="mb-8">
          <div className="inline-block border-b border-[#FF7C26] pb-1">
            <span className="text-[#FF7C26] text-[13px] md:text-sm font-semibold tracking-wider uppercase">
              Newsletter Invite
            </span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-extrabold text-black mb-4 tracking-tight leading-snug">
            हफ्ते में एक बार | एक किताब की बात | जब मन हो तो unsubscribe कर देना
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-[32px] font-extrabold text-black tracking-tight">
            "Once a week. One book. Leave whenever you like."
          </h3>
        </div>

        {/* Bottom Section: Text & Form */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          
          {/* Left Text */}
          <div className="text-center md:text-left flex-1">
            <p className="text-[16px] md:text-[18px] text-black font-normal mb-1">
              A Short Note About A Book Worth Your Time - Straight To Your Inbox.
            </p>
            <p className="text-[16px] md:text-[18px] text-black font-normal">
              Leave Whenever You Like.
            </p>
          </div>

          {/* Right Input & Button */}
          <form 
            className="flex flex-col sm:flex-row w-full md:w-auto gap-3 md:gap-4 flex-shrink-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="text-gray-800 w-full sm:w-[300px] lg:w-[380px] px-6 py-3.5 md:py-4 rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-[14px] md:text-[15px] shadow-sm"
            />
            <button
              type="submit"
              className="bg-[#FFAE79] hover:bg-[#ff9e5e] text-black font-bold py-3.5 md:py-4 px-8 rounded-full transition-colors duration-200 whitespace-nowrap shadow-sm"
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