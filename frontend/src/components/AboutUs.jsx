"use client"
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  // Animation variants for staggered fade-in effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full bg-[#fcf9f5] py-10 lg:py-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Animated Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
          className="flex flex-col items-center"
        >
          
          {/* Header Label */}
          <motion.div variants={itemVariants} className="w-full flex justify-start mb-12">
            <div className="inline-block border-b-2 border-[#f47c48] pb-1">
              <h2 className="text-[#f47c48] text-[13px] md:text-sm font-bold tracking-widest uppercase">
                ABOUT US
              </h2>
            </div>
          </motion.div>

          {/* Two Column Text Section */}
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
            
            {/* Center Vertical Divider (Hidden on mobile) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

            {/* Left Column (Hindi) */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-tight tracking-tight">
                Bodhi शुरू हुआ एक सवाल से - क्या Hindi साहित्य को वो जगह मिल रही है जिसकी वो हकदार है?
              </h3>
              <p className="text-[16px] text-black font-medium mb-6">
                हमारा जवाब था: नहीं। और फिर हमने यह जगह बनाई।
              </p>
              <p className="text-[16px] text-gray-800 leading-relaxed mb-10">
                यह सिर्फ एक bookstore नहीं है। यह एक ऐसी जगह है जहाँ आप बिना जल्दी के आ सकते हैं, पढ़ सकते हैं, सोच सकते हैं हर किताब यहाँ इसलिए है क्योंकि किसी ने उसे पढ़ा है, महसूस किया है
              </p>
              <div className="w-full border border-gray-300 rounded-full py-4 px-6 text-center shadow-sm">
                <span className="text-[#f47c48] text-lg font-bold">
                  हम बेचते नहीं - हम Recommend करते हैं।
                </span>
              </div>
            </motion.div>

            {/* Right Column (English) */}
            <motion.div variants={itemVariants} className="flex flex-col">
              <h3 className="text-3xl md:text-4xl font-bold text-black mb-8 leading-tight tracking-tight">
                "Bodhi started with a question - does Hindi literature get the space it deserves?
              </h3>
              <p className="text-[16px] text-black font-medium mb-6">
                Our answer was no. So we built this space.
              </p>
              <p className="text-[16px] text-gray-800 leading-relaxed mb-10">
                Not just a bookstore - a place to arrive without hurry, to read, to think. Every book here is here because someone read it and felt something.
              </p>
              <div className="w-full border border-gray-300 rounded-full py-4 px-6 text-center shadow-sm">
                <span className="text-[#f47c48] text-lg font-bold">
                  We don't sell - We Recommend."
                </span>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 mb-20">
            
            {/* Stat 1 */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 flex-1 justify-center text-center md:text-left">
              <span className="text-4xl md:text-5xl font-extrabold text-[#f47c48]">3,000+</span>
              <span className="text-[16px] text-gray-800 leading-tight max-w-[120px]">Titles in the collection</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-gray-400"></div>

            {/* Stat 2 */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 flex-1 justify-center text-center md:text-left">
              <span className="text-4xl md:text-5xl font-extrabold text-[#f47c48]">100%</span>
              <span className="text-[16px] text-gray-800 leading-tight max-w-[140px]">Hand-curated, no algorithm</span>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-16 bg-gray-400"></div>

            {/* Stat 3 */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 flex-1 justify-center text-center md:text-left">
              <span className="text-4xl md:text-5xl font-extrabold text-[#f47c48]">4 - 6</span>
              <span className="text-[16px] text-gray-800 leading-tight max-w-[140px]">Days to your door, with care</span>
            </div>

          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <button className="bg-[#f8b48f] hover:bg-[#f4a261] text-black text-[15px] font-medium py-3.5 px-8 rounded-full transition-colors duration-200 shadow-sm">
              Read Our Full Story →
            </button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;