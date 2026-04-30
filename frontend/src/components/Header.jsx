'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, User, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getCategories, getSubCategories } from '@/lib/api'; // ✅ Kept your API imports

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollRef = useRef(null);

  // Data states
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  // 1. Add a state to check login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cart states
  const { cartItems } = useCart();
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // =========================
  // 🔥 FETCH FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const subRes = await getSubCategories();
        setCategories(catRes.data || []);
        setSubCategories(subRes.data || []);
      } catch (err) {
        console.error("Header API Error:", err);
      }
    };
    fetchData();
  }, []);

  // --- Scroll Visibility Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Determine if we need the slider based on fetched categories
  const showSlider = categories.length > 8;

  // --- Mouse Wheel Horizontal Scroll Logic ---
  useEffect(() => {
    const el = scrollRef.current;
    if (el && showSlider) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [showSlider]);

  useEffect(() => {
    // Check if token exists in localStorage (or your preferred auth method)
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  // --- Click Arrows Slider Function ---
  const slide = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out shadow-sm border-b border-orange-900/10 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      style={{ backgroundColor: '#FFD3AC' }}
    >

      {/* --- TOP SECTION --- */}
      {/* Restored your exact UI sizes and layout */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex justify-between h-[120px]">

        {/* Left Side: Search & Top Links */}
        <div className="flex items-center gap-4 xl:gap-8 flex-1 pr-2">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Find your अगली किताब..."
              className="pl-10 pr-4 py-1.5 w-56 lg:w-64 xl:w-72 bg-white/50 border border-orange-900/20 rounded-full text-[13px] focus:outline-none focus:border-orange-900/50 placeholder-gray-700 transition-colors"
            />
          </div>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-medium whitespace-nowrap">
            <a href="#" className="flex items-center gap-1 text-gray-900 hover:text-orange-800 transition-colors">
              <span className="text-base">✦</span> नई आमद / Fresh Arrivals
            </a>
            {/* Hardcoded E-book Link */}
            <Link href="/store?cat=ebook" className="text-gray-900 hover:text-orange-800 transition-colors">
              ई-किताब / E-Book
            </Link>
          </div>
        </div>

        {/* Center Logo */}
        <div className="relative flex-shrink-0 flex justify-center w-[150px] xl:w-[180px] pb-3">
          <div className="bg-white rounded-b-full w-[110px] xl:w-[130px] px-4 pb-4 pt-5 shadow-sm flex justify-center">
            <Link href="/">
              <img
                src="/images/mainlogo.svg"
                alt="Bodhi Logo"
                className="h-[55px] xl:h-[65px] w-auto object-contain cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Right Side: Navigation & Icons */}
        <div className="flex items-center justify-end gap-4 xl:gap-8 flex-1 pl-2">
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-medium whitespace-nowrap">
            {/* Hardcoded Audio Book Link */}
            <Link href="/store?cat=audio" className="text-gray-900 hover:text-orange-800 transition-colors">
              सुनें / Audio Book
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-orange-800 transition-colors">About Us</Link>
            <Link href="/blogs" className="text-gray-900 hover:text-orange-800 transition-colors">Blogs</Link>
            <Link href="/contact" className="text-gray-900 hover:text-orange-800 transition-colors">Contact Us</Link>
          </div>

          <div className="flex items-center gap-2.5">
            <button className="p-1.5 rounded-full border border-orange-900/20 bg-white/30 hover:bg-white/60 transition-all text-gray-900">
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
            {/* User Profile / Login Link */}
            <Link href={isLoggedIn ? "/account" : "/user/login"}>
              <button
                className="p-1.5 rounded-full border border-orange-900/20 bg-white/30 hover:bg-white/60 transition-all text-gray-900 flex items-center justify-center"
                aria-label="Profile"
              >
                <User className={`w-[18px] h-[18px] ${isLoggedIn ? 'text-orange-900' : 'text-gray-900'}`} strokeWidth={1.5} />
              </button>
            </Link>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative">
              <div className="p-1.5 rounded-full border border-orange-900/20 bg-white/30 hover:bg-white/60 transition-all text-gray-900">
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: DYNAMIC CATEGORIES SLIDER --- */}
      {/* Restored the 400px height trick so dropdowns don't get clipped by overflow */}
      <div className="relative max-w-[1400px] mx-auto border-t border-orange-900/10 h-[50px] px-4 lg:px-8">

        {/* Left Slider Arrow */}
        {showSlider && (
          <button
            onClick={() => slide('left')}
            className="absolute left-0 top-0 h-[50px] z-50 bg-gradient-to-r from-[#FFD3AC] via-[#FFD3AC] to-transparent pr-4 pl-4 lg:pl-8 pointer-events-auto group hidden sm:flex items-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
          </button>
        )}

        {/* The Magic Scroll Container */}
        <div
          ref={scrollRef}
          className={`absolute top-0 h-[400px] scroll-smooth pointer-events-none [&::-webkit-scrollbar]:hidden ${showSlider ? 'left-8 right-8 overflow-x-auto' : 'left-4 right-4 lg:left-8 lg:right-8 overflow-visible'
            }`}
          style={{ scrollbarWidth: 'none' }}
        >
          {/* Internal Nav Container */}
          <nav className={`flex items-start py-2.5 pointer-events-auto h-[50px] ${showSlider ? 'min-w-max gap-8 px-6' : 'w-full justify-between'
            }`}>

            {/* Dynamic Rendering of Fetched Categories */}
            {categories.map((category, index) => {
              // Ensure we filter correctly based on your API structure (category?._id)
              const subs = subCategories.filter(sub => sub.category?._id === category._id);

              // --- SMART DROPDOWN POSITIONING ---
              let dropdownPos = "left-1/2 -translate-x-1/2";
              if (index === 0) {
                dropdownPos = "left-0";
              } else if (index === categories.length - 1) {
                dropdownPos = "right-0";
              }

              return (
                <div key={category._id} className="relative group flex-shrink-0">

                  {/* Main Category Link (Restored 2-line layout) */}
                  <Link href={`/store?cat=${category._id}`} className="flex flex-col items-center group-hover:text-orange-800 transition-colors">
                    <span className="text-[13px] font-medium text-gray-900 inherit whitespace-nowrap">
                      {category.nameHindi} {category.nameEnglish && '/'}
                    </span>
                    <div className="flex items-center gap-1 text-[12px] text-gray-700 inherit whitespace-nowrap">
                      <span>{category.nameEnglish}</span>
                      {subs.length > 0 && (
                        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                      )}
                    </div>
                  </Link>

                  {/* Subcategories Dropdown */}
                  {subs.length > 0 && (
                    <div className={`absolute top-full ${dropdownPos} pt-3 hidden group-hover:block z-50`}>
                      <div className="w-[280px] md:w-[320px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                        {subs.map((subItem) => (
                          <Link
                            key={subItem._id}
                            href={`/store?cat=${category._id}&sub=${subItem._id}`}
                            className="block px-5 py-2.5 text-[14px] text-gray-800 hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200 whitespace-normal"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right Slider Arrow */}
        {showSlider && (
          <button
            onClick={() => slide('right')}
            className="absolute right-0 top-0 h-[50px] z-50 bg-gradient-to-l from-[#FFD3AC] via-[#FFD3AC] to-transparent pl-4 pr-4 lg:pr-8 pointer-events-auto group hidden sm:flex items-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
          </button>
        )}

      </div>
    </header>
  );
};

export default Header;