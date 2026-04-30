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
      <div className="min-h-[60vh] flex items-center justify-center pt-[160px] text-2xl font-bold text-gray-500">
        Blog Post Not Found
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pb-24 pt-[220px]">
      
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* HERO IMAGE */}
        <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-[2rem] overflow-hidden mb-8 bg-gray-200">
          <img 
            src={blog.image || "/api/placeholder/1200/500"} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* META INFO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-gray-200 pb-6">
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            
            {/* Category */}
            <span className="inline-block bg-[#f3efe9] text-black text-[13px] font-bold px-4 py-1.5 rounded-full border border-gray-200">
              {blog.categoryLabel}
            </span>

            {/* Read Time */}
            <div className="flex flex-col gap-0.5 border-l border-gray-300 pl-4 sm:pl-8">
              <span className="text-gray-500 text-[12px] font-medium">Read time :</span>
              <span className="text-black text-[13px] font-semibold">
                {blog.readTimeEn} / {blog.readTimeHi}
              </span>
            </div>

            {/* Author */}
            <div className="flex flex-col gap-0.5 border-l border-gray-300 pl-4 sm:pl-8">
              <span className="text-gray-500 text-[12px] font-medium">Written by:</span>
              <span className="text-black text-[13px] font-semibold">
                {blog.authorEn} / {blog.authorHi}
              </span>
            </div>

          </div>

          {/* Share Button */}
          <button className="flex flex-col items-center justify-center border border-gray-300 rounded-full px-5 py-2 hover:bg-white transition-colors bg-transparent">
            <span className="flex items-center gap-2 text-[12px] font-bold text-black">
              <Share className="w-3.5 h-3.5" /> Share Book /
            </span>
            <span className="text-[11px] font-medium text-gray-700">
              किसी को भेजें जो पढ़ना चाहे
            </span>
          </button>
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl lg:text-[52px] font-black text-black mb-12 leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* QUOTES */}
        <div className="mb-12">
          <h3 className="text-[#F89E6E] text-2xl md:text-[28px] font-extrabold mb-2">
            {blog.quoteHi}
          </h3>
          <h4 className="text-[#F89E6E] text-xl md:text-[22px] font-extrabold">
            {blog.quoteEn}
          </h4>
        </div>

        {/* CONTENT */}
        <div className="prose prose-lg max-w-none text-black">
          {blog.content.map((block, index) => {
            
            if (block.type === 'heading') {
              return (
                <h3 key={index} className="text-[20px] font-extrabold text-black mt-10 mb-4">
                  {block.text}
                </h3>
              );
            }

            if (block.type === 'paragraph') {
              return (
                <p key={index} className="text-[16px] text-gray-800 leading-relaxed font-medium mb-5 whitespace-pre-line">
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