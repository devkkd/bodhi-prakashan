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

        // 🔥 PRODUCTS FORMAT (Updated for mainImage)
        const formattedProducts = prodRes.data.map(p => {
          // Determine the primary image securely based on the new schema
          const primaryImage = p.mainImage || (p.galleryImages && p.galleryImages[0]) || "/placeholder.jpg";

          return {
            id: p._id,
            title: p.title,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.originalPrice && p.price < p.originalPrice
              ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF`
              : "",
            image: primaryImage, // 🔥 This now matches exactly what ProductCard expects
            categoryId: p.category?._id
          };
        });

        // CATEGORIES FORMAT (REAL DB)
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
    <section className="w-full bg-[#fcf9f5] pt-10 md:pt-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* HEADER */}
        <div className="mb-16">
          <div className="inline-block border-b-2 border-[#f47c48] pb-1 mb-6">
            <h2 className="text-[#f47c48] text-sm font-bold tracking-wider uppercase">
              Featured Collections
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              आज क्या पढ़ें?
            </h1>
            <p className="text-gray-700 text-[15px] font-medium pb-1 md:pb-2">
              Collection names that feel editorial, not categorical:
            </p>
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="flex flex-col gap-8 md:gap-12">
          {featuredCategories.map((category) => {

            const content = editorialContent[category.id];

            const rowProducts = products
              .filter(p => p.categoryId === category.id)
              .slice(0, 5);

            if (!content) return null;

            return (
              <div key={category.id} className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">

                {/* LEFT */}
                <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col items-start pt-2">
                  <h3 className="text-2xl md:text-[28px] font-bold text-black mb-4 leading-tight">
                    {content.title}
                  </h3>
                  <p className="text-[15px] text-gray-700 whitespace-pre-line mb-8 leading-relaxed pr-4">
                    {content.description}
                  </p>
                  <button className="bg-[#f8b48f] hover:bg-[#f4a261] text-black text-[14px] font-medium py-2.5 px-6 rounded-full transition-colors">
                    {content.linkText}
                  </button>
                </div>

                {/* RIGHT */}
                <div className="w-full flex-1 overflow-x-auto pb-6 no-scrollbar">
                  <div className="flex gap-4 md:gap-6 min-w-max pr-4">
                    {rowProducts.map(product => (
                      <div key={product.id} className="w-[120px] md:w-[180px] flex-shrink-0">
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