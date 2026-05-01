"use client";

import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './ProductCard'; 
import { getProducts } from '@/lib/api';

const RelatedProducts = ({ currentCategoryId, currentProductId }) => {
  const [allProducts, setAllProducts] = useState([]);

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setAllProducts(res.data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProducts();
  }, []);

  // useMemo ensures we only recalculate related products when the dependencies change
  const relatedProducts = useMemo(() => {
    if (!currentCategoryId || allProducts.length === 0) return [];

    // 1. Filter products by the same category
    // 🔥 FIX: Safely check if category is an object (populated) or just a string ID
    const filtered = allProducts.filter((product) => {
      const productCatId = product.category?._id || product.category;
      return productCatId === currentCategoryId && product._id !== currentProductId;
    });

    // 3. Optional: Shuffle the array so it shows different related books each time 
    const shuffled = filtered.sort(() => 0.5 - Math.random());

    // 4. Return exactly max 5 products
    return shuffled.slice(0, 5);
  }, [currentCategoryId, currentProductId, allProducts]);

  // If there are no other products in this category, don't render the section at all
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#fcf9f5] py-16 md:py-24 border-t border-gray-200 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        {/* Section Title */}
        <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-extrabold text-black mb-10 md:mb-12 tracking-tight leading-snug">
          Readers Who Loved This Also Read / जिन्होंने यह पढ़ी, उन्होंने यह भी पढ़ी |
        </h2>

        {/* Products Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 sm:gap-x-6 xl:gap-8">
          {relatedProducts.map((product) => (
            <div key={product._id} className="w-full flex justify-center">
              {/* 🔥 FIX: Just pass the product object directly like you do in ProductDetailPage */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;