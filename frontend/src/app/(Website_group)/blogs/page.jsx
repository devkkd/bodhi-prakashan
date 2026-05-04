'use client';

import React, { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { blogs, blogCategories } from '@/data/BlogContent';

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Filter blogs based on active tab
  const displayBlogs = activeTab === 'all' 
    ? blogs 
    : blogs.filter(b => b.categoryId === activeTab);

  return (
    <div className="w-full bg-white min-h-screen  pb-16 sm:pb-24 pt-[80px] lg:pt-[160px]">
      
      {/* --- PAGE HEADER --- */}
      <div className="w-full bg-[#FFE8CC] py-6 sm:py-8 md:py-12 border-b border-orange-900/10">
        <h1 className="text-center text-2xl sm:text-3xl md:text-[40px] font-extrabold text-black tracking-tight">
          Blogs
        </h1>
      </div>

      {/* --- SUBTITLE & DESCRIPTION --- */}
      <div className="max-w-[800px] mx-auto px-4 text-center mt-10 sm:mt-12 md:mt-16 mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F89E6E] mb-4 sm:mb-6">
          पढ़ते-पढ़ते / Thoughts while reading
        </h2>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-gray-800 leading-relaxed font-medium mb-3 sm:mb-4">
          Essays, recommendations, and honest thoughts from our team - about Hindi literature, <br className="hidden md:block"/>
          the act of reading, and the books that stay with you.
        </p>
        <p className="text-[14px] sm:text-[15px] font-extrabold text-black">
          यह Blog नहीं है - यह एक reading diary है | This is not a blog - it is a reading diary.
        </p>
      </div>

      {/* --- CATEGORY TABS --- */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-10 sm:mb-12 border-b border-gray-300">
        <div className="flex overflow-x-auto no-scrollbar gap-6 sm:gap-8 md:gap-12 pb-4">
          {blogCategories.map((cat) => {
            const [english, hindi] = cat.title.split(' / ');
            const isActive = activeTab === cat.id;
            
            return (
              <button 
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative flex flex-col items-center flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#F89E6E]' : 'text-black hover:text-[#F89E6E]'
                }`}
              >
                <span className="text-[14px] sm:text-[15px] font-bold whitespace-nowrap">{english} /</span>
                <span className="text-[13px] sm:text-[14px] font-medium whitespace-nowrap">{hindi}</span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute -bottom-[17px] left-0 w-full h-1 bg-[#F89E6E] rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- BLOGS GRID --- */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {displayBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 sm:gap-y-12 lg:gap-y-16">
            {displayBlogs.map((blog) => (
              <div key={blog.slug} className="flex justify-center w-full">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 text-gray-500 font-medium text-[15px] sm:text-lg">
            No blogs found in this category yet.
          </div>
        )}
      </div>

    </div>
  );
}