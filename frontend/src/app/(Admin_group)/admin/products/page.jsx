'use client';

import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/lib/api";
import Link from "next/link";
import { Package, Plus, Pencil, Trash2, Loader2, Tag, BookOpen } from "lucide-react";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts();
      // Ensure we handle the data structure correctly (res.data is the array)
      setProducts(res.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10  text-[#7a4f2b]">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <Package className="w-8 h-8 text-[#C58A5A]" />
              Products Management
            </h1>
            <p className="text-[#C58A5A] mt-2 font-medium">
              Manage your inventory, pricing, and book details.
            </p>
          </div>

          <Link href="/admin/products/add">
            <button className="bg-[#7a4f2b] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5e3c20] transition-all hover:shadow-lg flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              <Plus className="w-5 h-5" /> Add New Book
            </button>
          </Link>
        </div>

        {/* CONTENT SECTION */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 text-[#C58A5A]">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-semibold">Fetching your collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-16 text-center">
            <div className="bg-[#FFF6ED] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-[#FFD3AC]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
            <p className="text-[#C58A5A] mb-8">Your digital library is currently empty.</p>
            <Link href="/admin/products/add">
              <button className="bg-[#7a4f2b] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5e3c20] transition-colors inline-flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create First Product
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => {
              // 🔥 FIX: Check for mainImage first, then fallback to galleryImages
              const adminImage = p.mainImage || (p.galleryImages && p.galleryImages[0]) || "/placeholder.jpg";

              return (
                <div 
                  key={p._id} 
                  className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300"
                >
                  
                  {/* Product Image Area */}
                  <div className="w-full h-64 bg-[#FFF6ED] p-4 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={adminImage}
                      alt={p.title}
                      // object-contain preserves book aspect ratios without cropping
                      className="w-full h-full object-contain mix-blend-multiply drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                    />
                    
                    {/* Stock Status Badge */}
                    <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${p.inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>

                    {/* Quick View Price Overlay on hover */}
                    <div className="absolute inset-0 bg-[#7a4f2b]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-1">
                    
                    <div className="mb-2">
                      <h2 className="font-bold text-gray-900 text-[16px] leading-snug line-clamp-2 min-h-[40px]">
                        {p.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#C58A5A] font-bold uppercase tracking-wide mb-4">
                      <Tag className="w-3 h-3" />
                      <span className="line-clamp-1">{p.category?.nameEnglish || "General"}</span>
                    </div>

                    <div className="mt-auto flex items-baseline gap-2 mb-5">
                       <span className="text-xl font-black text-[#7a4f2b]">₹{p.price}</span>
                       {p.originalPrice && p.originalPrice > p.price && (
                         <span className="text-sm text-gray-400 line-through">₹{p.originalPrice}</span>
                       )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#FFE7D1]">
                      <Link href={`/admin/products/edit/${p._id}`} className="flex-1">
                        <button className="w-full flex justify-center items-center gap-2 bg-[#FFF6ED] text-[#7a4f2b] py-2.5 rounded-lg font-bold text-sm hover:bg-[#7a4f2b] hover:text-white transition-all duration-200">
                          <Pencil className="w-4 h-4" /> Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 flex justify-center items-center gap-2 bg-red-50 text-red-600 py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 hover:text-white transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}