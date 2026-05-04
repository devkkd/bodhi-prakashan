"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts, getCategories } from '@/lib/api';

const FeaturedCollection = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // 🔥 FIXED CATEGORY IDS (DB ONES)
  const FEATURED_CATEGORY_IDS = [
    "69f3224808720847ad117711",
    "69f3227008720847ad117712",
    "69f3228708720847ad117713"
  ];

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        // 🔥 PRODUCTS FORMAT 
        const formattedProducts = prodRes.data.map(p => {
          const primaryImage = p.mainImage || (p.galleryImages && p.galleryImages[0]) || "/placeholder.jpg";

          return {
            id: p._id,
            title: p.title,
            writer: p.writer, 
            price: p.price,
            originalPrice: p.originalPrice,
            inStock: p.inStock ?? true, // 🔥 ADDED THIS SO PRODUCT CARD KNOWS
            discount: p.originalPrice && p.price < p.originalPrice
              ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF`
              : "",
            image: primaryImage, 
            categoryId: p.category?._id
          };
        });

        const formattedCategories = catRes.data.map(c => ({
          id: c._id,
          nameHindi: c.nameHindi,
          nameEnglish: c.nameEnglish
        }));

        setProducts(formattedProducts);
        setCategories(formattedCategories);

      } catch (err) {
        console.error("FeaturedCollection Error:", err);
      }
    };

    fetchData();
  }, []);

  // 🔥 EDITORIAL CONTENT (MAPPED TO REAL IDS)
  const editorialContent = {
    "69f3224808720847ad117711": {
      title: "उपन्यास जो नींद चुरा लेते हैं",
      description: `"Novels that steal your sleep"
Our fiction shelf - Godan, Raag Darbari, Tamas, and the writers who inherited their fire.`,
      linkText: "See All Collections →"
    },
    "69f3227008720847ad117712": {
      title: "कविता, जो आवाज़ बन जाए",
      description: `"Poetry that becomes a voice"
Verse collections - from Kabir's dohas to contemporary shayari that hits like a notification you didn't expect.`,
      linkText: "See All Collections →"
    },
    "69f3228708720847ad117713": {
      title: "सच्चाई जो कहानियों से गहरी है",
      description: `"Realities that ground you"
Memoirs, travelogues, and essays that capture the raw, unfiltered truth of the human experience.`,
      linkText: "See All Collections →"
    }
  };

  // 🔥 FILTER ONLY REQUIRED 3 CATEGORIES
  const featuredCategories = categories.filter(cat =>
    FEATURED_CATEGORY_IDS.includes(cat.id)
  );

  return (
    <section className="w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-10 md:mb-16">
          <div className="inline-block border-b-2 border-[#f47c48] pb-1 mb-4 md:mb-6">
            <h2 className="text-[#f47c48] text-xs md:text-sm font-bold tracking-wider uppercase">
              Featured Collections
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              आज क्या पढ़ें?
            </h1>
            <p className="text-gray-700 text-[14px] sm:text-[15px] font-medium pb-1 md:pb-2">
              Collection names that feel editorial, not categorical:
            </p>
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="flex flex-col gap-14 md:gap-16 lg:gap-20">
          {featuredCategories.map((category) => {

            const content = editorialContent[category.id];

            const rowProducts = products
              .filter(p => p.categoryId === category.id)
              .slice(0, 5);

            if (!content) return null;

            return (
              <div key={category.id} className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12 xl:gap-16">

                {/* LEFT: Text Content */}
                <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col items-start pt-2">
                  <h3 className="text-2xl sm:text-[26px] md:text-[28px] font-bold text-black mb-3 md:mb-4 leading-tight">
                    {content.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-gray-700 whitespace-pre-line mb-6 md:mb-8 leading-relaxed lg:pr-4">
                    {content.description}
                  </p>
                  <button className="bg-[#f8b48f] hover:bg-[#f4a261] text-black text-[13px] md:text-[14px] font-medium py-2.5 px-6 rounded-full transition-colors w-full sm:w-auto">
                    {content.linkText}
                  </button>
                </div>

                {/* RIGHT: Edge-to-edge swipable slider on mobile */}
                <div className="w-full flex-1 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex gap-4 sm:gap-5 md:gap-6 min-w-max pr-4 sm:pr-0">
                    {rowProducts.map(product => (
                      <div 
                        key={product.id} 
                        className="w-[140px] sm:w-[160px] md:w-[180px] xl:w-[200px] flex-shrink-0 snap-start"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;