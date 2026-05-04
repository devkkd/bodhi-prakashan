"use client"
import React, { useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

// Data extracted exactly from your design
const reviews = [
  {
    id: 1,
    text: "Bodhi is the only bookstore that feels like it was built for someone like me. The reader notes they include with each book - that's what makes it different. It's not a store, it's a recommendation from a friend who actually reads.",
    highlight: "किताब मिली, एक दोस्त भी मिला",
    name: "Ananya Pathak",
    context: "Delhi • Bought: Godan",
  },
  {
    id: 2,
    text: "I've been trying to get back into Hindi reading for years. The \"First Book\" collection is exactly what I needed - no overwhelming choices, just a gentle hand pointing me in the right direction.",
    highlight: "जहाँ से शुरू करना था, वो जगह मिल गई",
    name: "Rohan Sharma",
    context: "Pune • Bought: Raag Darbari",
  },
  {
    id: 3,
    text: "The packaging alone made me emotional. Tissue-wrapped, a handwritten note tucked inside. I've ordered from big platforms before - this is a completely different feeling. You can tell real people run this.",
    highlight: "हर पैकेट में थोड़ा-सा प्यार था",
    name: "Priya Mehta",
    context: "Mumbai • Gift order",
  },
  {
    id: 4,
    text: "As a Hindi literature student, I was skeptical of any online bookstore claiming to \"curate\" sahitya. But Bodhi actually knows what they're stocking. The Rajasthani literature section alone is better than most libraries.",
    highlight: "साहित्य को समझने वाले मिले आखिर",
    name: "Vikram Joshi",
    context: "Jaipur • MA Hindi Literature",
  },
  {
    id: 5,
    text: "I gifted my mother a set of classics for her birthday. She called me the same evening - she'd already started reading. That reaction was worth more than the order. Bodhi made that moment possible.",
    highlight: "माँ की आँखें पढ़ते हुए चमकीं",
    name: "Sunita Kapoor",
    context: "Lucknow • Gift Collection",
  }
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  // Smooth scroll function for the arrows
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Adjusted scroll amount to match roughly one card width dynamically
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper component for 5 solid stars
  const FiveStars = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill="#FFAE79" stroke="none" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
      ))}
    </div>
  );

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-8 md:gap-10">
          
          {/* Left: Titles */}
          <div className="flex flex-col">
            <div className="inline-block border-b-2 border-[#FFAE79] pb-1 w-fit mb-4 md:mb-6">
              <span className="text-[#FFAE79] text-xs sm:text-sm md:text-[15px] font-bold uppercase tracking-wider">
                Happy Our पाठक / Reader
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-black tracking-tight mb-3 md:mb-4 leading-tight">
              What Our पाठक Say
            </h2>
            <p className="text-[14px] sm:text-[15px] md:text-base text-gray-800 font-medium">
              Real readers. Honest words. No incentivised reviews.
            </p>
          </div>

          {/* Right: Overall Rating */}
          <div className="flex flex-col lg:items-end w-full lg:w-auto bg-white/50 lg:bg-transparent p-4 lg:p-0 rounded-2xl lg:rounded-none">
            <div className="flex items-center gap-3 sm:gap-4 mb-2">
              <span className="text-5xl sm:text-6xl md:text-[64px] font-extrabold text-[#FFAE79] leading-none">
                4.9
              </span>
              <div className="flex flex-col gap-1 justify-center">
                <FiveStars />
                <span className="text-[#FFAE79] text-[13px] sm:text-[14px] md:text-[15px] font-bold">
                  Rated 4.9 out of 5
                </span>
              </div>
            </div>
            <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-800 font-medium mt-1">
              Based on 840+ verified reader reviews
            </p>
          </div>

        </div>

        {/* --- REVIEWS CAROUSEL --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              // Width adjustments: 85vw on mobile ensures it fits but hints at the next card
              className="flex-shrink-0 w-[85vw] sm:w-[230px] md:w-[290px] border border-gray-300 rounded-[20px] md:rounded-[24px] p-5 sm:p-6 md:p-8 flex flex-col justify-between snap-start bg-transparent"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-black mb-1 md:mb-2">"</span>
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-gray-800 leading-relaxed mb-6 md:mb-8 sm:min-h-[140px]">
                  {review.text}
                </p>
                <p className="text-[14px] sm:text-[15px] font-bold text-black mb-6 md:mb-8 leading-snug">
                  {review.highlight}
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <div className="flex flex-col">
                  <span className="text-[14px] sm:text-[15px] font-bold text-black">{review.name}</span>
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">{review.context}</span>
                </div>
                <FiveStars />
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CONTROLS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4 sm:mt-6 gap-6 md:gap-4">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 md:gap-4 order-2 md:order-1">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFAE79] flex items-center justify-center hover:bg-[#ff9e5e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFAE79] focus:ring-offset-2 focus:ring-offset-[#fcf9f5]"
              aria-label="Previous reviews"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFAE79] flex items-center justify-center hover:bg-[#ff9e5e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFAE79] focus:ring-offset-2 focus:ring-offset-[#fcf9f5]"
              aria-label="Next reviews"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" strokeWidth={1.5} />
            </button>
          </div>

          {/* Disclaimer Text */}
          <p className="text-[11px] sm:text-[12px] md:text-[14px] font-medium text-gray-600 text-center uppercase tracking-wider order-3 md:order-2 max-w-[250px] md:max-w-none">
            All reviews are from verified purchases - unedited, unfiltered.
          </p>

          {/* CTA Button */}
          <button className="w-full md:w-auto order-1 md:order-3 bg-[#FFAE79] hover:bg-[#ff9e5e] text-black text-[14px] md:text-[15px] font-bold py-3.5 px-8 rounded-full transition-colors flex justify-center items-center shadow-sm">
            Read All Reviews →
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;