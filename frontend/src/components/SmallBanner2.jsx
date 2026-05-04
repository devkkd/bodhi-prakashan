import React from 'react';

const SmallBanner2 = () => {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#333333_0%,#0E0E0E_100%)] py-8 sm:py-10 md:py-12 lg:py-16 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      
      <div className="max-w-[1200px] mx-auto flex flex-col items-center w-full">
        
        {/* Complete Books Wordmark SVG */}
        <div className="flex items-center justify-center mb-4 md:mb-6 w-full px-2 sm:px-4">
          <img 
            src="/images/icons/books.svg" 
            alt="BOOKS Wordmark Graphic" 
            // Added sm: widths and max-w-full to prevent overflow on very small devices
            className="w-[240px] sm:w-[320px] md:w-[450px] lg:w-[600px] max-w-full h-auto object-contain" 
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2.5 sm:gap-3 w-full px-2">
          
          <h2 className="text-white text-[20px] sm:text-2xl md:text-3xl lg:text-[34px] font-bold tracking-wide leading-snug">
            अंग्रेज़ी व विश्व पुस्तकें / English & World
          </h2>
          
          <p className="text-gray-200 text-[13px] sm:text-[14px] md:text-[16px] font-medium italic">
            "The world's best stories, on the same shelf."
          </p>
          
          <p className="text-gray-300 text-[12px] sm:text-[13px] md:text-[15px] max-w-[90%] md:max-w-3xl lg:max-w-5xl mx-auto leading-relaxed mt-1 md:mt-2">
            International voices that belong in every thoughtful reader's library — selected with the same care as everything else here.
          </p>

        </div>

      </div>
    </section>
  );
};

export default SmallBanner2;