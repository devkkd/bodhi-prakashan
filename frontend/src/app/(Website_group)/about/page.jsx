"use client";

import React from "react";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";

export default function AboutPage() {
  return (
    <>
      <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pt-[160px]">
        
        {/* --- PAGE HEADER --- */}
        <div className="w-full bg-[#FFE8CC] py-8 md:py-12 border-b border-orange-900/10">
          <h1 className="text-center text-3xl md:text-[40px] font-extrabold text-black tracking-tight">
            About Us
          </h1>
        </div>

        <div className="max-w-[1450px] mx-auto px-4 lg:px-8 py-16 md:py-24">
          
          {/* --- SECTION: WHO WE ARE --- */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#F89E6E] text-center mb-16">
              हम कौन हैं / Who we are
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* Hindi Column */}
              <div className="flex flex-col">
                <h3 className="text-[20px] md:text-[24px] font-extrabold text-black leading-snug mb-6">
                  Bodhi शुरू हुआ एक सवाल से - क्या Hindi साहित्य को वो जगह मिल रही है जिसकी वो हकदार है?
                </h3>
                <div className="text-[15px] text-gray-800 font-medium leading-relaxed space-y-4 flex-1">
                  <p>हमारा जवाब था: नहीं। और फिर हमने यह जगह बनाई।</p>
                  <p>
                    यह सिर्फ एक bookstore नहीं है। यह एक ऐसी जगह है जहाँ आप बिना जल्दी के आ सकते हैं, पढ़ सकते हैं, सोच सकते हैं। हर किताब यहाँ इसलिए है क्योंकि किसी ने उसे पढ़ा है, महसूस किया है।
                  </p>
                </div>
                <div className="mt-8 border border-gray-300 rounded-full py-4 px-6 text-center shadow-sm">
                  <span className="text-[16px] font-bold text-[#F89E6E]">हम बेचते नहीं - हम Recommend करते हैं |</span>
                </div>
              </div>

              {/* English Column */}
              <div className="flex flex-col">
                <h3 className="text-[20px] md:text-[24px] font-extrabold text-black leading-snug mb-6">
                  "Bodhi started with a question - does Hindi literature get the space it deserves?"
                </h3>
                <div className="text-[15px] text-gray-800 font-medium leading-relaxed space-y-4 flex-1">
                  <p>Our answer was no. So we built this space.</p>
                  <p>
                    Not just a bookstore - a place to arrive without hurry, to read, to think. Every book here is here because someone read it and felt something.
                  </p>
                </div>
                <div className="mt-8 border border-gray-300 rounded-full py-4 px-6 text-center shadow-sm">
                  <span className="text-[16px] font-bold text-[#F89E6E]">We don't sell - We Recommend."</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION: STATS --- */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 border-y border-gray-200 py-12 mb-24">
            
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <span className="text-4xl md:text-5xl font-black text-[#F89E6E]">3,000+</span>
              <span className="text-[15px] font-medium text-gray-800">Titles in the collection</span>
            </div>

            <div className="hidden md:block w-px h-16 bg-gray-300 mx-4"></div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <span className="text-4xl md:text-5xl font-black text-[#F89E6E]">100%</span>
              <span className="text-[15px] font-medium text-gray-800 max-w-[150px]">Hand-curated, no algorithm</span>
            </div>

            <div className="hidden md:block w-px h-16 bg-gray-300 mx-4"></div>

            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <span className="text-4xl md:text-5xl font-black text-[#F89E6E]">4 - 6</span>
              <span className="text-[15px] font-medium text-gray-800 max-w-[150px]">Days to your door, with care</span>
            </div>

          </div>

          {/* --- SECTION: OUR STORY --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-8">Our Story</h2>
              <div className="text-[15px] text-gray-800 font-medium leading-relaxed space-y-6">
                <p>
                  Bodhi is a curated home for Hindi साहित्य - classic and contemporary, well-known and overlooked, serious and joyful. Every title on our shelves has been read by someone on our team.
                </p>
                <p>
                  Every description is written honestly - what the book asks of you, who it is for, why it matters.
                </p>
                <p>
                  We are not a warehouse. We are not a marketplace. We are a bookstore - in the oldest, truest sense of that word.
                </p>
                <p>
                  A place where books are chosen with care, described with honesty, and sent to you with intention.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
              {/* Replace with your actual image path */}
              <img 
                src="/images/about/our-story.jpg" 
                alt="Bodhi Book Stall" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Our+Story+Image" }}
              />
            </div>
          </div>

          {/* --- SECTION: WHAT MAKES US DIFFERENT --- */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-black text-center mb-16 tracking-tight">
              What Makes us Different
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-gray-300">
              
              <div className="flex flex-col px-4 lg:px-8">
                <h3 className="text-[16px] font-bold text-black mb-1">हाथ से चुनी हर किताब /</h3>
                <h4 className="text-[16px] font-bold text-black mb-4">Every book, hand-picked</h4>
                <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                  No catalog imports. No bulk listings. If a book sits on our shelf, someone read it first.
                </p>
              </div>

              <div className="flex flex-col px-4 lg:px-8 border-t border-gray-300 pt-8 sm:border-t-0 sm:pt-0">
                <h3 className="text-[16px] font-bold text-black mb-1">ईमानदार राय /</h3>
                <h4 className="text-[16px] font-bold text-black mb-4">Honest reader notes</h4>
                <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                  We write what we actually think. If a book is slow to start, we say so. If it demands patience, we warn you. And if it is worth every page, we tell you that too.
                </p>
              </div>

              <div className="flex flex-col px-4 lg:px-8 border-t border-gray-300 pt-8 lg:border-t-0 lg:pt-0">
                <h3 className="text-[16px] font-bold text-black mb-1">सोच-समझकर पैक /</h3>
                <h4 className="text-[16px] font-bold text-black mb-4">Packed with care</h4>
                <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                  Tissue-wrapped. Corner-protected. A small note tucked inside. Because a book's first impression matters - even before you open it.
                </p>
              </div>

              <div className="flex flex-col px-4 lg:px-8 border-t border-gray-300 pt-8 sm:border-t-0 sm:pt-0 lg:border-t-0 lg:pt-0">
                <h3 className="text-[16px] font-bold text-black mb-1">पाठकों के लिए /</h3>
                <h4 className="text-[16px] font-bold text-black mb-4">Built for readers</h4>
                <p className="text-[14px] text-gray-700 font-medium leading-relaxed">
                  No membership pressure. No upselling. No countdown timers. Just books, chosen well, described honestly, and sent to you with care.
                </p>
              </div>

            </div>
          </div>

          {/* --- SECTION: OUR PHILOSOPHY --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200">
               {/* Replace with your actual image path */}
              <img 
                src="/images/about/philosophy.jpg" 
                alt="Bodhi Books Philosophy" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Philosophy+Image" }}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-[40px] font-extrabold text-black mb-8 tracking-tight">Our Philosophy</h2>
              <div className="text-[15px] text-gray-800 font-medium leading-relaxed space-y-6">
                <p>
                  We believe reading is not a hobby - it is a practice.<br/>
                  A slow, deliberate, deeply personal practice. In a world that rewards speed, we are building something that rewards stillness.
                </p>
                <p className="text-[16px] font-bold text-black">
                  पढ़ना एक ritual है, जल्दी नहीं | Reading is a ritual, not a rush.
                </p>
                <p>
                  That line is not a tagline. It is how we make every decision - what we stock, how we write, how we pack, how we talk to you.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Features />
      <Newsletter />
    </>
  );
}