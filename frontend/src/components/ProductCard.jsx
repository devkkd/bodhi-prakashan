"use client";
import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }) => {
    // Failsafe
    if (!product) return null;

    // Support both MongoDB (_id) and mapped (id)
    const productId = product._id || product.id;

    // 🔥 FIX: Match the property name 'image' sent from StorePage mapping
    // Also added a fallback check for 'mainImage' directly from API
    const imageSrc = product.image || product.mainImage || "/placeholder.jpg";

    return (
        <Link href={`/products/${productId}`} className="flex flex-col w-full max-w-[300px] font-sans group cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] bg-gray-100">
                <img
                    src={imageSrc}
                    alt={product.title || "Product"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // Handle broken links gracefully
                    onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                />

                {/* Favorite/Heart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="absolute bottom-4 left-4 bg-white p-2.5 rounded-full shadow-md hover:scale-110 transition-transform duration-200 focus:outline-none z-10"
                >
                    <Heart className="w-5 h-5 text-[#f47c48]" strokeWidth={1.5} />
                </button>
            </div>

            {/* Card Content */}
            <div className="mt-4 flex flex-col pr-2">
                {/* Title */}
                <h3 className="text-[16px] font-bold text-black leading-snug line-clamp-2 min-h-[44px]">
                    {product.title}
                </h3>

                {/* Pricing Row */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[18px] font-extrabold text-black tracking-tight">
                        ₹{product.price}
                    </span>
                    
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-[14px] font-medium text-gray-400 line-through">
                            ₹{product.originalPrice}
                        </span>
                    )}

                    {product.discount && (
                         <span className="text-[14px] font-semibold text-[#f47c48]">
                            {product.discount}
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <div className='pt-4' onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;