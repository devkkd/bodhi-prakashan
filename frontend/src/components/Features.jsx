import React from 'react';

const Features = () => {
  return (
    <section className="w-full bg-[#faf8f5] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-0">

        {/* Block 1 */}
        <div className="flex-1 flex flex-col items-center text-center px-4 md:px-8">
          <img
            src="/images/icons/icon5.svg"
            alt="Handpicked books"
            className="h-32 md:h-40 w-auto object-contain mb-6 md:mb-8"
          />
          <h3 className="text-[20px] md:text-[22px] font-bold text-black mb-3">
            हर किताब हाथ से चुनी
          </h3>
          <p className="text-[14px] md:text-[15px] text-gray-800 leading-relaxed max-w-[280px]">
            No automated catalog. Every title we stock, someone from our team has read or stands behind.
          </p>
        </div>

        {/* Divider 1 */}
        <div className="hidden md:block w-px bg-gray-300 my-4"></div>

        {/* Block 2 */}
        <div className="flex-1 flex flex-col items-center text-center px-4 md:px-8">
          <img
            src="/images/icons/icon6.svg"
            alt="By readers, for readers"
            className="h-32 md:h-40 w-auto object-contain mb-6 md:mb-8"
          />
          <h3 className="text-[20px] md:text-[22px] font-bold text-black mb-3">
            पाठकों द्वारा, पाठकों के लिए
          </h3>
          <p className="text-[14px] md:text-[15px] text-gray-800 leading-relaxed max-w-[280px]">
            Reader-written notes with each book. Not publisher blurbs - honest impressions.
          </p>
        </div>

        {/* Divider 2 */}
        <div className="hidden md:block w-px bg-gray-300 my-4"></div>

        {/* Block 3 */}
        <div className="flex-1 flex flex-col items-center text-center px-4 md:px-8">
          <img
            src="/images/icons/icon7.svg"
            alt="Delivery that feels like a book"
            className="h-32 md:h-40 w-auto object-contain mb-6 md:mb-8"
          />
          <h3 className="text-[20px] md:text-[22px] font-bold text-black mb-3">
            Delivery जो किताब की तरह हो
          </h3>
          <p className="text-[14px] md:text-[15px] text-gray-800 leading-relaxed max-w-[280px]">
            Carefully packed. Tissue-wrapped. Because the book's journey to you matters too.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Features;