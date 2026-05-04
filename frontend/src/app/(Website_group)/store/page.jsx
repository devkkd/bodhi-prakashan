'use client';

import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, getSubCategories } from '@/lib/api';
import Features from '@/components/Features';
import Newsletter from '@/components/Newsletter';

// Sort Options
const sortOptions = [
  { id: 'price_asc', label: 'किफ़ायती पहले / Price: Low to High' },
  { id: 'price_desc', label: 'प्रीमियम पहले / Price: High to Low' },
  { id: 'oldest', label: 'क्लासिक पहले / Oldest First' },
  { id: 'newest', label: 'नई आमद पहले / Newest First' }
];

const StoreContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [currentSort, setCurrentSort] = useState(null);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // =========================
  // 🔥 FETCH DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, subRes] = await Promise.all([
          getProducts(),
          getCategories(),
          getSubCategories()
        ]);

        const rawProducts = prodRes.data || [];
        
        const formattedProducts = rawProducts.map(p => {
          let imageUrl = "/placeholder-book.png";
          if (p.mainImage) {
            imageUrl = p.mainImage;
          } else if (p.galleryImages && p.galleryImages.length > 0) {
            imageUrl = p.galleryImages[0];
          }

          return {
            id: p._id,
            title: p.title,
            writer: p.writer, // Always good to pass this along
            price: p.price,
            originalPrice: p.originalPrice,
            inStock: p.inStock ?? true, // 🔥 FIX: Passed inStock here!
            discount: p.originalPrice && p.price < p.originalPrice
              ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF`
              : "",
            image: imageUrl, 
            gallery: p.galleryImages || [],
            categoryId: p.category?._id,
            subCategoryId: p.subCategory?._id,
            createdAt: p.createdAt
          };
        });

        setAllProducts(formattedProducts);
        setCategories(catRes.data?.map(c => ({
          id: c._id,
          title: `${c.nameHindi} / ${c.nameEnglish}`
        })) || []);
        
        setSubCategories(subRes.data?.map(s => ({
          id: s._id,
          categoryId: s.category?._id,
          title: s.title
        })) || []);

      } catch (err) {
        console.error("Store API Error:", err);
      }
    };

    fetchData();
  }, []);

  // =========================
  // QUERY HELPER
  // =========================
  const createQueryString = useCallback((name, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    if (name === 'cat') params.delete('sub');
    return params.toString();
  }, [searchParams]);

  // =========================
  // FILTER + SORT logic
  // =========================
  useEffect(() => {
    const catId = searchParams.get('cat');
    const subId = searchParams.get('sub');
    const sortParam = searchParams.get('sort');

    let filtered = [...allProducts];

    if (subId) {
      filtered = filtered.filter(p => p.subCategoryId === subId);
      setActiveSubCategory(subCategories.find(s => s.id === subId));
      setActiveCategory(categories.find(c => c.id === catId));
    } else if (catId) {
      filtered = filtered.filter(p => p.categoryId === catId);
      setActiveCategory(categories.find(c => c.id === catId));
      setActiveSubCategory(null);
    } else {
      setActiveCategory({ title: "सभी पुस्तकें / All Books" });
      setActiveSubCategory({ title: "संग्रह / Collection" });
    }

    setCurrentSort(sortParam);

    if (sortParam === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortParam === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortParam === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setDisplayProducts(filtered);
  }, [searchParams, allProducts, categories, subCategories]);

  return (
    <>
      <div className="w-full bg-white min-h-screen  pb-16 sm:pb-24 pt-[80px] lg:pt-[160px]">
        {/* Banner */}
        <div className="w-full bg-[#FFE8CC] py-6 sm:py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h2 className="text-black text-[14px] sm:text-[16px] md:text-[18px] font-bold tracking-wide">
                {activeCategory?.title || "सभी पुस्तकें / All Books"}
              </h2>
            </div>
            <div className="w-full md:w-1/3 text-center">
              <h1 className="text-black text-2xl sm:text-3xl md:text-[40px] font-extrabold tracking-tight leading-snug">
                {activeSubCategory?.title || "संग्रह / Collection"}
              </h1>
            </div>
            <div className="hidden md:block w-full md:w-1/3"></div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="w-full bg-white border-b border-gray-200 relative z-40">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5 flex flex-row flex-wrap sm:flex-nowrap items-center justify-between gap-y-3 gap-x-3 sm:gap-4">
            
            {/* Count (Mobile Top, Desktop Center) */}
            <div className="w-full sm:w-auto text-center order-1 sm:order-2">
              <h2 className="text-[14px] sm:text-[15px] md:text-[18px] font-bold text-black pb-0.5 inline-block">
                {displayProducts.length} पुस्तकें मिलीं
              </h2>
            </div>

            {/* Sort Button (Mobile Left, Desktop Left) */}
            <div className="relative flex-1 sm:flex-none order-2 sm:order-1">
              <button
                onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 border border-gray-300 rounded-full px-3 sm:px-6 py-2 sm:py-2.5 w-full hover:border-gray-400 transition-colors bg-white shadow-sm"
              >
                <span className="text-[13px] sm:text-[14px] text-gray-800 font-medium whitespace-nowrap">Sort by / क्रम चुनें</span>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full left-0 mt-2 sm:mt-3 w-[240px] sm:w-[260px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-2 z-50">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        router.push(pathname + '?' + createQueryString('sort', opt.id), { scroll: false });
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-[13px] sm:text-[14px] transition-colors ${currentSort === opt.id ? 'bg-[#111111] text-white font-medium' : 'text-gray-800 hover:bg-gray-50'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Button (Mobile Right, Desktop Right) */}
            <div className="relative flex-1 sm:flex-none order-3 sm:order-3">
              <button
                onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 border border-gray-300 rounded-full px-3 sm:px-6 py-2 sm:py-2.5 w-full hover:border-gray-400 transition-colors bg-white shadow-sm"
              >
                <span className="text-[13px] sm:text-[14px] text-gray-800 font-medium whitespace-nowrap">Filter / छाँटें</span>
                <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full right-0 mt-2 sm:mt-3 w-[260px] sm:w-[300px] md:w-[340px] bg-white border border-gray-200 rounded-xl shadow-lg py-3 sm:py-4 px-4 sm:px-5 flex flex-col gap-3 sm:gap-4 ">
                  {categories.map((cat) => {
                    const isSelected = activeCategory?.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          const newValue = isSelected ? null : cat.id.toString();
                          router.push(pathname + '?' + createQueryString('cat', newValue), { scroll: false });
                          setIsFilterOpen(false);
                        }}
                        className="flex items-center gap-2.5 sm:gap-3 w-full text-left group"
                      >
                        <div className={`w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'bg-[#111111]' : 'bg-[#C0B5AB] group-hover:bg-gray-400'}`}>
                          {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={4} />}
                        </div>
                        <span className={`text-[13px] sm:text-[14px] transition-colors leading-tight ${isSelected ? 'font-bold text-black' : 'text-gray-800 group-hover:text-black'}`}>
                          {cat.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Grid */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 relative z-0">
          {displayProducts.length > 0 ? (
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 sm:gap-x-4 md:gap-x-6 xl:gap-8 gap-y-8 sm:gap-y-10 xl:gap-y-12">
              {displayProducts.map((product) => (
                <div key={product.id} className="w-full flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-20 sm:py-32 flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">कोई किताब नहीं मिली / No books found</h3>
              <p className="text-[14px] sm:text-[16px] text-gray-500 font-medium">We are currently restocking this section.</p>
            </div>
          )}
        </div>
      </div>
      <Features />
      <Newsletter />
    </>
  );
};

export default function StorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center font-bold text-lg pt-[120px] lg:pt-[250px]">
        Loading Collection...
      </div>
    }>
      <StoreContent />
    </Suspense>
  );
}