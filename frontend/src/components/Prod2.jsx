"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/api';

const Prod2 = () => {

  const [randomProducts, setRandomProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();

        const formatted = res.data.map(p => {
          // 🔥 Securely extract the main image based on the new schema
          const primaryImage = p.mainImage || (p.galleryImages && p.galleryImages[0]) || "/placeholder.jpg";

          return {
            id: p._id,
            title: p.title,
            price: p.price,
            originalPrice: p.originalPrice,
            discount: p.originalPrice && p.price < p.originalPrice
              ? `${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% OFF`
              : "",
            // Assign the extracted image to the 'image' key that ProductCard expects
            image: primaryImage,
          };
        });

        // Randomize the array to show different products
        const shuffled = formatted.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 10));
        setIsMounted(true);
      } catch (err) {
        console.error("Error fetching random products for Prod2:", err);
        setIsMounted(true); // Mount anyway to avoid infinite blank screens on error
      }
    };

    fetchProducts();
  }, []);

  // Hydration mismatch prevention
  if (!isMounted) {
    return <section className="w-full bg-[#fcf9f5] min-h-[800px]"></section>;
  }

  return (
    <section className="w-full bg-[#fcf9f5] py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col items-center">

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 sm:gap-x-6 xl:gap-8">
          {randomProducts.map(product => (
            <div key={product.id} className="w-full flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button className="mt-16 bg-[#f8b48f] hover:bg-[#f4a261] text-black text-[15px] font-medium py-3.5 px-8 rounded-full transition-colors">
          See All Collections →
        </button>

      </div>
    </section>
  );
};

export default Prod2;