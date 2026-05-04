import React from 'react';
import { Share } from 'lucide-react';
import { blogs } from '@/data/BlogContent';

export default async function BlogDetailPage({ params }) {
  // ✅ IMPORTANT: Await params (Next.js latest behavior)
  const { slug } = await params;

  // ✅ Debug (remove later)
  console.log("Slug from URL:", slug);
  console.log("All slugs:", blogs.map(b => b.slug));

  // ✅ Find blog
  const blog = blogs.find((b) => b.slug === slug);

  // ❌ If not found
  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-[100px] lg:pt-[160px] text-xl sm:text-2xl font-bold text-gray-500">
        Blog Post Not Found
      </div>
    );
  }

  return (
    <div className="w-full bg-white min-h-screen  pb-16 sm:pb-24 pt-[100px] lg:pt-[210px]">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO IMAGE */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] rounded-2xl md:rounded-[2rem] overflow-hidden mb-6 sm:mb-8 bg-gray-200 shadow-sm">
          <img 
            src={blog.image || "/api/placeholder/1200/500"} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* META INFO */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 sm:mb-12 border-b border-gray-200 pb-6">
          
          <div className="flex flex-row flex-wrap items-center gap-y-4 gap-x-4 sm:gap-x-6 w-full lg:w-auto">
            
            {/* Category */}
            <span className="inline-block bg-[#f3efe9] text-black text-[12px] sm:text-[13px] font-bold px-3 sm:px-4 py-1.5 rounded-full border border-gray-200 shrink-0">
              {blog.categoryLabel}
            </span>

            {/* Read Time */}
            <div className="flex flex-col gap-0.5 border-l border-gray-300 pl-4 sm:pl-6 shrink-0">
              <span className="text-gray-500 text-[11px] sm:text-[12px] font-medium uppercase tracking-wider">Read time :</span>
              <span className="text-black text-[12px] sm:text-[13px] font-semibold">
                {blog.readTimeEn} / {blog.readTimeHi}
              </span>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-0.5 border-l border-gray-300 pl-4 sm:pl-6 shrink-0">
              <span className="text-gray-500 text-[11px] sm:text-[12px] font-medium uppercase tracking-wider">Written by:</span>
              <span className="text-black text-[12px] sm:text-[13px] font-semibold">
                {blog.authorEn} / {blog.authorHi}
              </span>
            </div>

          </div>

          {/* Share Button */}
          <button className="w-full lg:w-auto flex flex-col items-center justify-center border border-gray-300 rounded-full px-5 py-2.5 sm:py-2 hover:bg-white transition-colors bg-transparent active:scale-95">
            <span className="flex items-center gap-2 text-[13px] sm:text-[12px] font-bold text-black">
              <Share className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> Share Book /
            </span>
            <span className="text-[12px] sm:text-[11px] font-medium text-gray-700">
              किसी को भेजें जो पढ़ना चाहे
            </span>
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-black mb-8 sm:mb-12 leading-tight sm:leading-tight lg:leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* QUOTES */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-[#F89E6E] text-xl sm:text-2xl md:text-[28px] font-extrabold mb-2 leading-snug">
            {blog.quoteHi}
          </h3>
          <h4 className="text-[#F89E6E] text-lg sm:text-xl md:text-[22px] font-extrabold leading-snug">
            {blog.quoteEn}
          </h4>
        </div>

        {/* CONTENT */}
        <div className="prose prose-base sm:prose-lg max-w-none text-black">
          {blog.content.map((block, index) => {
            
            if (block.type === 'heading') {
              return (
                <h3 key={index} className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold text-black mt-8 sm:mt-10 mb-3 sm:mb-4 leading-snug">
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <p key={index} className="text-[15px] sm:text-[16px] text-gray-800 leading-relaxed font-medium mb-4 sm:mb-5 whitespace-pre-line">
                  {block.text}
                </p>
              );
            }

            return null;
          })}
        </div>

      </div>
    </div>
  );
}