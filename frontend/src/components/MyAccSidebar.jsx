"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MyAccSidebar = ({ logout }) => {
  const pathname = usePathname();

  // Helper to check active link
  const isActive = (path) => pathname === path;

  const menuItems = [
    { name: 'Orders / मेरे आदेश', path: '/account/orders' },
    { name: 'My Account / मेरा अकाउंट', path: '/account' },
    { name: 'Address Book / मेरे पते', path: '/account/address' },
  ];

  return (
    <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 space-y-4 sm:space-y-6 ">
      
      {/* Menu Container */}
      <div className="bg-white border border-gray-200 rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-sm">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`w-full flex items-center justify-between px-4 py-3.5 sm:p-5 md:px-6 md:py-5 transition-all border-b border-gray-200 last:border-0 ${
              isActive(item.path)
                ? 'bg-[#FFAE79] text-black font-bold'
                : 'bg-white hover:bg-gray-50 text-gray-800 font-medium'
            }`}
          >
            <span className="text-[14px] sm:text-[15px] md:text-[16px] tracking-wide">
              {item.name}
            </span>
            <ChevronRight 
              strokeWidth={isActive(item.path) ? 2.5 : 1.5} 
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive(item.path) ? 'text-black' : 'text-gray-400'}`} 
            />
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3 sm:py-4 px-6 border border-gray-300 rounded-full text-[14px] sm:text-[15px] font-medium text-gray-800 bg-white hover:bg-gray-50 hover:text-red-600 hover:border-gray-400 transition-all flex items-center justify-center shadow-sm active:scale-95"
      >
        Log out / बाहर जाएँ
      </button>
      
    </div>
  );
};

export default MyAccSidebar;