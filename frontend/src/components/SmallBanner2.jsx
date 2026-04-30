import React from 'react';

const SmallBanner2 = () => {
  return (
    <section className="w-full bg-[linear-gradient(180deg,#333333_0%,#0E0E0E_100%)] py-5 md:py-8 px-4 flex flex-col items-center justify-center text-center">
      
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Complete Books Wordmark SVG */}
        <div className="flex items-center justify-center mb-2 md:mb-3 w-full px-4">
          <img 
            src="/images/icons/books.svg" 
            alt="BOOKS Wordmark Graphic" 
            className="w-[280px] md:w-[450px] lg:w-[600px] h-auto object-contain" 
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white text-2xl md:text-3xl lg:text-[34px] font-bold tracking-wide">
            अंग्रेज़ी व विश्व पुस्तकें / English & World
          </h2>
          
          <p className="text-gray-200 text-[14px] md:text-[16px] font-medium">
            "The world's best stories, on the same shelf."
          </p>
          
          <p className="text-gray-300 text-[13px] md:text-[15px] max-w-5xl mx-auto leading-relaxed">
            International voices that belong in every thoughtful reader's library — selected with the same care as everything else here.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SmallBanner2;