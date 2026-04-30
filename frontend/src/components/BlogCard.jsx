import React from 'react';
import Link from 'next/link';

const BlogCard = ({ blog }) => {
  return (
    <div className="w-full flex flex-col group cursor-pointer">
      {/* Blog Image */}
      <Link href={`/blogs/${blog.slug}`} className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-5">
        <img 
          src={blog.image || "/api/placeholder/600/400"} 
          alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block bg-[#f3efe9] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full border border-gray-200">
          {blog.categoryLabel}
        </span>
      </div>

      {/* Title */}
      <Link href={`/blogs/${blog.slug}`}>
        <h3 className="text-xl font-extrabold text-black mb-6 leading-snug group-hover:text-[#F89E6E] transition-colors">
          {blog.title}
        </h3>
      </Link>

      {/* Meta Info (Read Time & Author) */}
      <div className="flex items-center gap-6 mb-6 text-[13px]">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-medium">Read time :</span>
          <span className="text-black font-semibold">{blog.readTimeEn} / {blog.readTimeHi}</span>
        </div>
        {/* Vertical Divider */}
        <div className="w-px h-8 bg-gray-300"></div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 font-medium">Written by:</span>
          <span className="text-black font-semibold">{blog.authorEn} / {blog.authorHi}</span>
        </div>
      </div>

      {/* Read Button */}
      <div>
        <Link 
          href={`/blogs/${blog.slug}`}
          className="inline-block bg-[#FCA57D] hover:bg-[#f49368] text-black text-[14px] font-bold px-6 py-2.5 rounded-full transition-colors"
        >
          Read this Piece / पढ़ें
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;