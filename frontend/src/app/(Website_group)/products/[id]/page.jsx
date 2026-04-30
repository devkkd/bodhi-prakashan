"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Heart, Share, Info } from 'lucide-react';
import { getProductById, getProducts } from '@/lib/api';

import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import RelatedProducts from '@/components/RelatedProducts';
import Features from '@/components/Features';
import Newsletter from '@/components/Newsletter';

export default function ProductDetailPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getProductById(id);
                const all = await getProducts();

                setProduct(res.data);
                // If API returns { data: [...] }, set accordingly
                setAllProducts(Array.isArray(all.data) ? all.data : []);

            } catch (err) {
                console.error("Error fetching product details:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-xl font-bold text-gray-400 pt-[160px]">
                <span className="animate-pulse">Loading book details...</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-xl font-bold text-gray-400 pt-[160px]">
                Product not found
            </div>
        );
    }

    // 🔥 NEW IMAGE LOGIC: Combine mainImage and galleryImages
    const displayImages = [];
    if (product.mainImage) displayImages.push(product.mainImage);
    if (product.galleryImages && Array.isArray(product.galleryImages)) {
        product.galleryImages.forEach(img => {
            if (img && img !== product.mainImage) displayImages.push(img);
        });
    }

    // Fallback if no images exist
    if (displayImages.length === 0) {
        displayImages.push("/placeholder.jpg");
    }

    const suggestedBooks = product.writer
        ? allProducts.filter((p) => p.writer === product.writer && p._id !== product._id)
        : [];

    const displayDiscount = product.originalPrice && product.price < product.originalPrice
        ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`
        : null;

    return (
        <div className='w-full bg-white'>
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12 font-sans pt-[180px] md:pt-[220px]">

                {/* --- TOP SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* LEFT: Image Gallery */}
                    <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-4 h-max">
                        {/* Thumbnails */}
                        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible sm:w-24 shrink-0 pb-2 sm:pb-0 no-scrollbar">
                            {displayImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`w-20 sm:w-full shrink-0 aspect-[2/3] rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === idx
                                        ? 'border-[#F89E6E] shadow-md scale-[1.02]'
                                        : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <img 
                                        src={img} 
                                        alt={`Thumbnail ${idx}`} 
                                        className="w-full h-full object-cover bg-[#fcf9f5]" 
                                        onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative flex-1 aspect-[2/3] bg-[#fcf9f5] rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                            <img 
                                src={displayImages[selectedImage]} 
                                alt={product.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                            />
                            <button className="absolute bottom-4 left-4 bg-white p-3.5 rounded-full shadow-md hover:scale-110 transition-transform duration-200 text-gray-400 hover:text-[#F89E6E]">
                                <Heart className="w-6 h-6" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="lg:col-span-7 flex flex-col pt-2 lg:pt-4">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-black tracking-tight leading-tight mb-3">
                                {product.title}
                            </h1>
                            {product.writer && (
                                <p className="text-lg font-medium text-gray-500">
                                    By <span className="text-black font-bold">{product.writer}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <div className={`px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.inStock ? 'संचय में | In Stock' : 'Out of Stock'}
                            </div>
                            {product.readingTime && (
                                <div className="bg-gray-100 text-gray-800 px-4 py-1.5 rounded-full text-[13px] font-semibold">
                                    Reading Time: {product.readingTime}
                                </div>
                            )}
                        </div>

                        <div className="flex items-end gap-4 mb-4">
                            <span className="text-4xl md:text-5xl font-black text-black">₹{product.price}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-xl font-semibold text-gray-400 line-through mb-1">₹{product.originalPrice}</span>
                            )}
                            {displayDiscount && (
                                <span className="text-lg font-bold text-[#F89E6E] bg-orange-50 px-2 py-0.5 rounded-md mb-1">{displayDiscount}</span>
                            )}
                        </div>
                        <p className="text-[13px] font-medium text-gray-500 mb-10">Tax included. Shipping calculated at checkout.</p>

                        <div className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-line mb-8">
                            {product.description || "No description available for this book."}
                        </div>

                        {product.note && (
                            <div className="bg-[#fcf9f5] border-l-4 border-[#F89E6E] p-4 rounded-r-xl mb-10">
                                <p className="text-[14px] font-semibold text-[#d4703a] flex items-start gap-2">
                                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                    <span>{product.note}</span>
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <AddToCartButton product={product} />
                            </div>
                            <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-800 px-8 py-3 h-14 rounded-full font-bold hover:bg-gray-50 transition-all duration-200 shadow-sm">
                                <Share className="w-4 h-4" />
                                <span>Share Book</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM SECTION: Specs & Suggestions --- */}
                <div className="flex flex-col lg:flex-row gap-12 mt-24 pt-16 border-t border-gray-200">
                    
                    {/* LEFT: Book Details Card */}
                    <div className="w-full lg:w-[350px] shrink-0">
                        <div className="bg-[#fcf9f5] border border-orange-900/10 p-6 md:p-8 rounded-3xl h-max">
                            <h3 className="text-xl font-extrabold text-black mb-6">Book Details</h3>
                            <ul className="space-y-4 text-[14px] text-gray-700">
                                <li className="flex flex-col"><span className="text-[12px] font-medium text-gray-400 uppercase mb-0.5">Writer</span> <span className="font-semibold text-black">{product.writer || "Unknown"}</span></li>
                                <li className="flex flex-col"><span className="text-[12px] font-medium text-gray-400 uppercase mb-0.5">Publication Date</span> <span className="font-semibold text-black">{product.bookDetails?.publicationDate || "N/A"}</span></li>
                                <li className="flex flex-col"><span className="text-[12px] font-medium text-gray-400 uppercase mb-0.5">Print Length</span> <span className="font-semibold text-black">{product.bookDetails?.printLength || "N/A"}</span></li>
                                <div className="border-t border-gray-200 my-2"></div>
                                <li className="flex justify-between items-center"><span className="text-gray-500">Origin</span> <span className="font-semibold text-black">{product.bookDetails?.countryOfOrigin || "India"}</span></li>
                                <li className="flex justify-between items-center"><span className="text-gray-500">ASIN</span> <span className="font-semibold text-black">{product.bookDetails?.asin || "N/A"}</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Suggestions */}
                    {suggestedBooks.length > 0 && (
                        <div className="flex-1">
                            <div className="mb-8">
                                <h3 className="text-2xl font-extrabold text-black">More by {product.writer}</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {suggestedBooks.map((book) => (
                                    <ProductCard key={book._id} product={book} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {product.category && (
                    <div className="mt-12">
                        <RelatedProducts
                            currentCategoryId={product.category._id || product.category}
                            currentProductId={product._id}
                        />
                    </div>
                )}

                <Features />
                <Newsletter />

            </div>
        </div>
    );
}