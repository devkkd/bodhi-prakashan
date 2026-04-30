"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/api';

const ClassicsSection = () => {

  const [displayProducts, setDisplayProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        // 🔥 FORMAT DATA (Updated for mainImage schema)
        const formatted = res.data.map(p => {
          // Securely extract the main image with fallback
          const primaryImage = p.mainImage || (p.galleryImages && p.galleryImages[0]) || "/placeholder.jpg";

          return {
            id: p._id,
            title: p.title,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.originalPrice && p.price < p.originalPrice
              ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF`
              : "",
            image: primaryImage, // 🔥 Mapped correctly for ProductCard
            categoryId: p.category?._id
          };
        });

        // 🔥 FILTER CLASSICS
        // Note: Make sure "8" is the actual MongoDB ObjectId for this category if you recently migrated DBs!
        let classics = formatted.filter(p => p.categoryId === "8");

        // ⚠️ fallback if less than 5
        if (classics.length < 5) {
          const others = formatted.filter(p => p.categoryId !== "8");
          classics = [...classics, ...others];
        }

        // 🔥 RANDOM 5
        const shuffled = classics
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setDisplayProducts(shuffled);
        setIsMounted(true);

      } catch (err) {
        console.error("ClassicsSection Error:", err);
        setIsMounted(true); // Mount anyway to prevent infinite blank screens
      }
    };

    fetchProducts();
  }, []);

  // Prevent SSR mismatch
  if (!isMounted) {
    return <section className="w-full bg-[#FFE8CC] min-h-[600px]"></section>;
  }

  return (
    <section className="w-full bg-[#FFE8CC] py-16 md:py-24 overflow-hidden font-sans">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-black mb-4 tracking-tight">
          क्लासिक्स / Classics
        </h2>
        <p className="text-black font-medium text-[15px] md:text-[16px] mb-1">
          "Written then, Needed now." / तब लिखा, आज भी ज़रूरी
        </p>
        <p className="text-gray-900 text-[14px] md:text-[15px] leading-relaxed">
          The foundational works of Hindi literature - Premchand, Nirala, Dinkar, and the voices that built the language you love.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 sm:gap-x-6 xl:gap-8">
          {displayProducts.map(product => (
            <div key={product.id} className="w-full flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12 md:mt-16">
        <button className="bg-white hover:bg-gray-50 text-black text-[14px] font-medium py-3.5 px-8 rounded-full shadow-sm transition-all duration-200 border border-transparent hover:border-gray-200">
          See All Collections →
        </button>
      </div>

    </section>
  );
};

export default ClassicsSection;