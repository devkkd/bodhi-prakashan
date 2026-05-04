'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingCart, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getCategories, getSubCategories, getProducts } from '@/lib/api'; // 🔥 Imported getProducts
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollRef = useRef(null);
  const router = useRouter();

  // Data states
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // 🔥 Store all products for local search
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);

  // 🔥 Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Refs to detect clicks outside the search bar
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Cart states
  const { cartItems } = useCart();
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false); 
    }
  };

  // =========================
  // 🔥 FETCH FROM BACKEND
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes, prodRes] = await Promise.all([
          getCategories(),
          getSubCategories(),
          getProducts() // 🔥 Fetch products on load for instant search
        ]);
        setCategories(catRes.data || []);
        setSubCategories(subRes.data || []);
        setAllProducts(prodRes.data || []);
      } catch (err) {
        console.error("Header API Error:", err);
      }
    };
    fetchData();
  }, []);

  // =========================
  // 🔥 LIVE SEARCH LOGIC
  // =========================
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      // Filter products by title or writer
      const results = allProducts.filter(p => 
        p.title.toLowerCase().includes(query) || 
        (p.writer && p.writer.toLowerCase().includes(query))
      ).slice(0, 5); // Limit to top 5 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  // Handle clicking outside of search to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target)) &&
        (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target))
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const slide = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleMobileCategory = (categoryId) => {
    setOpenMobileCategory(prev => prev === categoryId ? null : categoryId);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // =========================
  // 🔥 SEARCH DROPDOWN UI
  // =========================
  const SearchResultsDropdown = () => {
    if (!searchQuery.trim() || !isSearchFocused) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-3 bg-[#fdfbf7] border border-[#e6d0b6] rounded-[20px] shadow-xl overflow-hidden z-50 flex flex-col max-h-[400px] overflow-y-auto custom-scrollbar">
        {searchResults.length > 0 ? (
          searchResults.map((product) => {
            const imageSrc = product.mainImage || (product.galleryImages && product.galleryImages[0]) || "/placeholder.jpg";
            const discountPercent = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : null;

            return (
              <Link 
                key={product._id} 
                href={`/products/${product._id}`} // 🔥 Routes directly to the product
                onClick={() => { setIsSearchFocused(false); setSearchQuery(""); setIsMobileMenuOpen(false); }}
                className="flex gap-4 p-4 border-b border-[#e6d0b6] last:border-b-0 hover:bg-[#FFE8CC]/40 transition-colors"
              >
                <div className="w-[60px] sm:w-[70px] aspect-[2/3] shrink-0 bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                  <img src={imageSrc} alt={product.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex flex-col justify-center flex-1">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-black leading-snug line-clamp-2 mb-2">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-[16px] sm:text-[18px] font-black text-black">₹{product.price}</span>
                    {discountPercent && (
                      <span className="text-[12px] sm:text-[13px] font-bold text-[#FCA57D]">{discountPercent}% OFF</span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-[13px] sm:text-[14px] font-semibold text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-6 text-center text-gray-500 font-medium text-sm">
            कोई किताब नहीं मिली / No books found
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out shadow-sm border-b border-orange-900/10 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        style={{ backgroundColor: '#FFD3AC' }}
      >

        {/* --- TOP SECTION --- */}
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[70px] sm:h-[80px] lg:h-[120px]">

          {/* Left Side: Hamburger, Search & Top Links */}
          <div className="flex items-center justify-start lg:justify-around gap-3 lg:gap-4 flex-1 h-full pr-[60px] lg:pr-[100px] xl:pr-[130px]">

            {/* Hamburger Icon (Mobile/Tablet only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 rounded-md hover:bg-orange-900/10 text-gray-900 transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* 🔥 Desktop/Tablet Search Bar */}
            <div className="relative hidden md:block" ref={desktopSearchRef}>
              <form onSubmit={handleSearch}>
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 cursor-pointer" onClick={handleSearch} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)} // Open dropdown
                  placeholder="Find अगली किताब..."
                  className="pl-10 pr-4 py-1.5 w-48 lg:w-56 xl:w-72 bg-white/50 border border-orange-900/20 rounded-full text-[13px] focus:outline-none focus:border-orange-900/50 focus:bg-white placeholder-gray-700 transition-colors relative z-10"
                />
              </form>
              <SearchResultsDropdown />
            </div>

            {/* Desktop Left Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-medium whitespace-nowrap">
              <Link href="/fresh-arrivals" className="flex items-center gap-1 text-gray-900 hover:text-orange-800 transition-colors">
                <span className="text-base">✦</span> नई आमद / Fresh Arrivals
              </Link>
              <Link href="/comingSoon?type=ebook" className="text-gray-900 hover:text-orange-800 transition-colors">
                ई-किताब / E-Book
              </Link>
            </div>
          </div>

          {/* Center Logo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-start z-10">
            <Link href="/">
              <img
                src="/images/bodhilogo.svg"
                alt="Bodhi Logo"
                className="h-[60px] sm:h-[70px] lg:h-[110px] w-auto object-top object-contain cursor-pointer transition-all duration-300"
              />
            </Link>
          </div>

          {/* Right Side: Navigation & Icons */}
          <div className="flex items-center justify-end lg:justify-around gap-3 sm:gap-4 flex-1 h-full pl-[60px] lg:pl-[100px] xl:pl-0">

            {/* Desktop Right Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] font-medium whitespace-nowrap">
              <Link href="/comingSoon?type=audio" className="text-gray-900 hover:text-orange-800 transition-colors">
                सुनें / Audio Book
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-orange-800 transition-colors">About Us</Link>
              <Link href="/blogs" className="text-gray-900 hover:text-orange-800 transition-colors">Blogs</Link>
              <Link href="/contact" className="text-gray-900 hover:text-orange-800 transition-colors">Contact Us</Link>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <Link href={isLoggedIn ? "/account" : "/user/login"}>
                <button
                  className="p-2 sm:p-1.5 rounded-full border border-transparent sm:border-orange-900/20 sm:bg-white/30 hover:bg-white/60 transition-all text-gray-900 flex items-center justify-center"
                  aria-label="Profile"
                >
                  <User className={`w-5 h-5 sm:w-[18px] sm:h-[18px] ${isLoggedIn ? 'text-orange-900' : 'text-gray-900'}`} strokeWidth={1.5} />
                </button>
              </Link>

              <Link href="/cart" className="relative flex items-center justify-center">
                <div className="p-2 sm:p-1.5 rounded-full border border-transparent sm:border-orange-900/20 sm:bg-white/30 hover:bg-white/60 transition-all text-gray-900">
                  <ShoppingCart className="w-5 h-5 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 bg-black text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: DYNAMIC CATEGORIES SLIDER (Desktop Only) --- */}
        <div className="hidden lg:block relative max-w-[1400px] mx-auto border-t border-orange-900/10 h-[50px] px-8">

          {showSlider && (
            <button
              onClick={() => slide('left')}
              className="absolute left-0 top-0 h-[50px] z-50 bg-gradient-to-r from-[#FFD3AC] via-[#FFD3AC] to-transparent pr-4 pl-8 pointer-events-auto group flex items-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
            </button>
          )}

          <div
            ref={scrollRef}
            className={`absolute top-0 h-[400px] scroll-smooth pointer-events-none [&::-webkit-scrollbar]:hidden ${showSlider ? 'left-8 right-8 overflow-x-auto' : 'left-8 right-8 overflow-visible'
              }`}
            style={{ scrollbarWidth: 'none' }}
          >
            <nav className={`flex items-start py-2.5 pointer-events-auto h-[50px] ${showSlider ? 'min-w-max gap-8 px-6' : 'w-full justify-between'}`}>

              {categories.map((category, index) => {
                const subs = subCategories.filter(sub => sub.category?._id === category._id);

                let dropdownPos = "left-1/2 -translate-x-1/2";
                if (index === 0) dropdownPos = "left-0";
                else if (index === categories.length - 1) dropdownPos = "right-0";

                return (
                  <div key={category._id} className="relative group flex-shrink-0">
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

          {showSlider && (
            <button
              onClick={() => slide('right')}
              className="absolute right-0 top-0 h-[50px] z-50 bg-gradient-to-l from-[#FFD3AC] via-[#FFD3AC] to-transparent pl-4 pr-8 pointer-events-auto group flex items-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-black transition-colors" />
            </button>
          )}

        </div>
      </header>

      {/* =========================================
          🔥 FULL SCREEN MOBILE MENU DRAWER
          ========================================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden bg-[#FFD3AC] transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col overflow-y-auto`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 pt-0 border-b border-orange-900/10 shrink-0">
          <div className="">
            <img src="/images/bodhilogo.svg" alt="Bodhi Logo" className="h-[75px] w-auto object-contain" />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-orange-900/10 transition-colors pt-4"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Mobile Navigation Content */}
        <div className="flex-1 px-5 py-6 flex flex-col gap-6">

          {/* 🔥 Mobile Search Bar */}
          <div className="relative w-full" ref={mobileSearchRef}>
            <form onSubmit={handleSearch}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 cursor-pointer" onClick={handleSearch} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)} // Open dropdown
                placeholder="Find अगली किताब..."
                className="pl-11 pr-4 py-3 w-full bg-white/60 border border-orange-900/20 rounded-full text-[14px] focus:outline-none focus:border-orange-900/50 focus:bg-white placeholder-gray-700 transition-colors shadow-sm relative z-10"
              />
            </form>
            <SearchResultsDropdown />
          </div>

          {/* Main Quick Links */}
          <div className="flex flex-col gap-4 text-lg font-medium text-gray-900 pl-1">
            <Link href="/fresh-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">
              ✦ नई आमद / Fresh Arrivals
            </Link>
            <Link href="/comingSoon?type=ebook" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">
              ई-किताब / E-Book
            </Link>
            <Link href="/comingSoon?type=audio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">
              सुनें / Audio Book
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">About Us</Link>
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">Blogs</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-orange-800">Contact Us</Link>
          </div>

          <div className="w-full h-px bg-orange-900/10 my-2"></div>

          {/* Dynamic Categories Accordion */}
          <div className="flex flex-col gap-1 pl-1">
            <h3 className="text-[13px] uppercase tracking-wider text-orange-900/70 font-bold mb-3">Categories</h3>

            {categories.map((category) => {
              const subs = subCategories.filter(sub => sub.category?._id === category._id);
              const isOpen = openMobileCategory === category._id;

              return (
                <div key={category._id} className="flex flex-col border-b border-orange-900/5 last:border-0">
                  <div
                    className="flex items-center justify-between py-3.5 cursor-pointer"
                    onClick={() => subs.length > 0 ? toggleMobileCategory(category._id) : setIsMobileMenuOpen(false)}
                  >
                    <Link
                      href={`/store?cat=${category._id}`}
                      className="text-[15px] sm:text-base font-medium text-gray-900 leading-snug pr-4"
                      onClick={(e) => {
                        if (subs.length === 0) setIsMobileMenuOpen(false);
                      }}
                    >
                      {category.nameHindi} {category.nameEnglish && `| ${category.nameEnglish}`}
                    </Link>

                    {/* Toggle Icon */}
                    {subs.length > 0 && (
                      <button className="p-1 shrink-0" aria-label="Toggle subcategories">
                        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Subcategories Dropdown (Mobile) */}
                  {subs.length > 0 && isOpen && (
                    <div className="pl-4 pb-3 pt-1 flex flex-col gap-3">
                      {subs.map((subItem) => (
                        <Link
                          key={subItem._id}
                          href={`/store?cat=${category._id}&sub=${subItem._id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[14px] sm:text-sm text-gray-700 hover:text-orange-900 py-1"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;