import React from 'react';

const SmallBanner = () => {
  return (
    <section className="relative w-full py-16 md:py-20 bg-[#FFD3AC] overflow-hidden flex items-center justify-center">
      
      {/* Background Pattern */}
      {/* Using an absolute inset div ensures the background repeats correctly behind the content */}
      <div 
        className="absolute inset-0 z-0 opacity-4 mix-blend-multiply"
        style={{
          backgroundImage: "url('/images/bgpatterm.svg')",
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        
        {/* Left Eye Icon */}
        {/* Hidden on very small mobile screens to keep text readable, visible on md and up */}
        <div className="hidden sm:block flex-shrink-0">
          <img 
            src="/images/icons/eye.svg" 
            alt="Left Eye Decoration" 
            className="h-24 md:h-32 lg:h-40 w-auto object-contain" 
          />
        </div>

        {/* Center Text Block */}
        <div className="flex-1 flex flex-col items-center text-center px-4">
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-black mb-6 tracking-tight">
            भारतीय भाषाएँ / Indian Languages
          </h2>
          
          <p className="text-[15px] md:text-base font-medium text-black mb-2">
            "One country, many tongues."
          </p>
          
          <p className="text-[14px] md:text-[15px] text-black font-normal max-w-4xl mx-auto leading-relaxed">
            Literature translated from Tamil, Bengali, Kannada, Malayalam, and more because great Indian writing doesn't speak only one language.
          </p>
        </div>

        {/* Right Eye Icon */}
        <div className="hidden sm:block flex-shrink-0">
          <img 
            src="/images/icons/eye.svg" 
            alt="Right Eye Decoration" 
            className="h-24 md:h-32 lg:h-40 w-auto object-contain" 
          />
        </div>

      </div>
    </section>
  );
};

export default SmallBanner;