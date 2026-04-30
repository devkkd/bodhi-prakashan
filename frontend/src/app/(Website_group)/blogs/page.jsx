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
    <div className="w-full bg-[#fcf9f5] min-h-screen font-sans pb-24 pt-[160px]">
      
      {/* --- PAGE HEADER --- */}
      <div className="w-full bg-[#FFE8CC] py-8 md:py-12 border-b border-orange-900/10">
        <h1 className="text-center text-3xl md:text-[40px] font-extrabold text-black tracking-tight">
          Blogs
        </h1>
      </div>

      {/* --- SUBTITLE & DESCRIPTION --- */}
      <div className="max-w-[800px] mx-auto px-4 text-center mt-16 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#F89E6E] mb-6">
          पढ़ते-पढ़ते / Thoughts while reading
        </h2>
        <p className="text-[15px] md:text-[16px] text-gray-800 leading-relaxed font-medium mb-4">
          Essays, recommendations, and honest thoughts from our team - about Hindi literature, <br className="hidden md:block"/>
          the act of reading, and the books that stay with you.
        </p>
        <p className="text-[15px] font-extrabold text-black">
          यह Blog नहीं है - यह एक reading diary है | This is not a blog - it is a reading diary.
        </p>
      </div>

      {/* --- CATEGORY TABS --- */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-12 border-b border-gray-300">
        <div className="flex overflow-x-auto no-scrollbar gap-8 md:gap-12 pb-4">
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
                <span className="text-[15px] font-bold whitespace-nowrap">{english} /</span>
                <span className="text-[14px] font-medium whitespace-nowrap">{hindi}</span>
                
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {displayBlogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 font-medium text-lg">
            No blogs found in this category yet.
          </div>
        )}
      </div>

    </div>
  );
}