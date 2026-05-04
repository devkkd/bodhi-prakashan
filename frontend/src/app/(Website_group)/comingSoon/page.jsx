'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Headphones, BookOpen, ArrowLeft, Clock } from 'lucide-react';

const ComingSoonContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type'); // 'ebook' or 'audio'

  // Dynamic Content Configuration
  const content = {
    ebook: {
      title: "ई-किताबें जल्द आ रही हैं",
      subtitle: "E-Books Coming Soon",
      description: "We are currently digitizing our curated collection. Soon, you will be able to carry your favorite Hindi literature anywhere in your pocket.",
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-[#F89E6E]" strokeWidth={1.5} />,
      color: "bg-[#F89E6E]/10"
    },
    audio: {
      title: "ऑडियो बुक्स जल्द आ रही हैं",
      subtitle: "Audio Books Coming Soon",
      description: "We are recording our books with voices that understand the soul of Hindi literature. Close your eyes and prepare to listen.",
      icon: <Headphones className="w-16 h-16 sm:w-20 sm:h-20 text-[#F89E6E]" strokeWidth={1.5} />,
      color: "bg-[#F89E6E]/10"
    },
    default: {
      title: "जल्द आ रहा है",
      subtitle: "Coming Soon",
      description: "We are working on something special. Check back later for updates to our collection.",
      icon: <Clock className="w-16 h-16 sm:w-20 sm:h-20 text-[#F89E6E]" strokeWidth={1.5} />,
      color: "bg-gray-100"
    }
  };

  // Select the content based on the URL parameter (fallback to default)
  const displayData = content[type] || content.default;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4  pt-[80px] lg:pt-[250px]">
      
      {/* Container */}
      <div className="max-w-2xl w-full text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Animated Icon Circle */}
        <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full ${displayData.color} flex items-center justify-center mb-8 sm:mb-10 relative`}>
          <div className="absolute inset-0 rounded-full border-2 border-[#F89E6E] opacity-20 animate-ping"></div>
          {displayData.icon}
        </div>

        {/* Text Content */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight mb-2 sm:mb-4">
          {displayData.title}
        </h1>
        
        <h2 className="text-xl sm:text-2xl font-bold text-gray-500 mb-6 sm:mb-8">
          {displayData.subtitle}
        </h2>
        
        <div className="w-16 h-1 bg-[#F89E6E] rounded-full mb-6 sm:mb-8"></div>
        
        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-relaxed max-w-lg mb-10 sm:mb-12 font-medium">
          {displayData.description}
        </p>

        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-bold text-[14px] sm:text-[15px] hover:bg-[#F89E6E] hover:text-black transition-all duration-300 hover:shadow-md active:scale-95 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          वापस जाएँ / Go Back
        </button>

      </div>

    </div>
  );
};

// Wrap in Suspense because we are using useSearchParams()
export default function ComingSoonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center text-xl font-bold text-gray-500">
        Loading...
      </div>
    }>
      <ComingSoonContent />
    </Suspense>
  );
}