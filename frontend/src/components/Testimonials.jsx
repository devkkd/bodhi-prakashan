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
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper component for 5 solid stars
  const FiveStars = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill="#FFAE79" stroke="none" className="w-[18px] h-[18px] md:w-5 md:h-5" />
      ))}
    </div>
  );

  return (
    <section className="w-full bg-[#fcf9f5] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          
          {/* Left: Titles */}
          <div className="flex flex-col">
            <div className="inline-block border-b-2 border-[#FFAE79] pb-1 w-fit mb-6">
              <span className="text-[#FFAE79] text-sm md:text-[15px] font-medium">
                Happy Our पाठक / Reader
              </span>
            </div>
            <h2 className="text-4xl md:text-[50px] font-extrabold text-black tracking-tight mb-4 leading-tight">
              What Our पाठक Say
            </h2>
            <p className="text-[15px] md:text-base text-gray-800 font-medium">
              Real readers. Honest words. No incentivised reviews.
            </p>
          </div>

          {/* Right: Overall Rating */}
          <div className="flex flex-col lg:items-end">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl md:text-[64px] font-extrabold text-[#FFAE79] leading-none">
                4.9
              </span>
              <div className="flex flex-col gap-1">
                <FiveStars />
                <span className="text-[#FFAE79] text-[14px] md:text-[15px] font-medium">
                  Rated 4.9 out of 5
                </span>
              </div>
            </div>
            <p className="text-[14px] md:text-[15px] text-black font-medium mt-1">
              Based on 840+ verified reader reviews
            </p>
          </div>

        </div>

        {/* --- REVIEWS CAROUSEL --- */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar snap-x snap-mandatory"
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="flex-shrink-0 w-[300px] md:w-[350px] border border-gray-300 rounded-[24px] p-6 md:p-8 flex flex-col justify-between snap-start bg-transparent"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-black mb-2">"</span>
                <p className="text-[14px] md:text-[15px] text-gray-800 leading-relaxed mb-8 min-h-[140px]">
                  {review.text}
                </p>
                <p className="text-[15px] font-bold text-black mb-8">
                  {review.highlight}
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <span className="text-[15px] font-bold text-black">{review.name}</span>
                  <span className="text-[14px] font-medium text-black">{review.context}</span>
                </div>
                <FiveStars />
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM CONTROLS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#c0b5ab] flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-black" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFAE79] flex items-center justify-center hover:bg-[#ff9e5e] transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-black" strokeWidth={1.5} />
            </button>
          </div>

          {/* Disclaimer Text */}
          <p className="text-[13px] md:text-[14px] font-medium text-black text-center uppercase tracking-wide">
            ALL REVIEWS ARE FROM VERIFIED PURCHASES - UNEDITED, UNFILTERED.
          </p>

          {/* CTA Button */}
          <button className="bg-[#FFAE79] hover:bg-[#ff9e5e] text-black text-[14px] md:text-[15px] font-medium py-3.5 px-8 rounded-full transition-colors whitespace-nowrap">
            Read All Reviews →
          </button>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;