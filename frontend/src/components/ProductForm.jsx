'use client';

import { useEffect, useState, useRef } from "react";
import {
  getCategories,
  getSubCategories,
  createProduct,
  getProductById,
  updateProduct
} from "@/lib/api";
import {
  PackagePlus, Save, Image as ImageIcon, Trash2, GripVertical,
  Info, IndianRupee, Tag, FileText, Loader2, UploadCloud, Clock
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductForm({ mode, productId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom Image State for Preview and Reordering
  const [previewImages, setPreviewImages] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    writer: "",
    description: "",
    note: "",
    price: "",
    originalPrice: "",
    readingTime: "",
    inStock: true,
    category: "",
    subCategory: "",
    bookDetails: {
      asin: "", publicationDate: "", printLength: "",
      itemWeight: "", dimensions: "", countryOfOrigin: "",
      packer: "", genericName: ""
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const catRes = await getCategories();
      const subRes = await getSubCategories();

      setCategories(catRes.data || []);
      setSubCategories(subRes.data || []);

      if (mode === "edit" && productId) {
        const res = await getProductById(productId);
        const data = res.data;

        setForm({
          title: data.title || "",
          writer: data.writer || "",
          description: data.description || "",
          note: data.note || "",
          price: data.price || "",
          originalPrice: data.originalPrice || "",
          readingTime: data.readingTime || "",
          inStock: data.inStock ?? true,
          category: data.category?._id || "",
          subCategory: data.subCategory?._id || "",
          bookDetails: {
            asin: data.bookDetails?.asin || "",
            publicationDate: data.bookDetails?.publicationDate || "",
            printLength: data.bookDetails?.printLength || "",
            itemWeight: data.bookDetails?.itemWeight || "",
            dimensions: data.bookDetails?.dimensions || "",
            countryOfOrigin: data.bookDetails?.countryOfOrigin || "",
            packer: data.bookDetails?.packer || "",
            genericName: data.bookDetails?.genericName || ""
          }
        });

        // 🔥 FIX: Load mainImage and galleryImages into the preview list
        const imagesList = [];
        if (data.mainImage) {
          imagesList.push({ id: 'main', url: data.mainImage, file: null, isExisting: true });
        }
        if (data.galleryImages && Array.isArray(data.galleryImages)) {
          data.galleryImages.forEach((img, idx) => {
            if (img !== data.mainImage) {
              imagesList.push({ id: `gal-${idx}`, url: img, file: null, isExisting: true });
            }
          });
        }
        setPreviewImages(imagesList);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSubs = subCategories.filter(sub => sub.category?._id === form.category);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });
  const handleBookDetails = (field, value) => {
    setForm({ ...form, bookDetails: { ...form.bookDetails, [field]: value } });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map(file => ({
      id: `${file.name}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file: file,
      isExisting: false,
    }));

    setPreviewImages(prev => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idToRemove) => {
    setPreviewImages(prev => prev.filter(img => img.id !== idToRemove));
  };

  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newImages = [...previewImages];
    const draggedItem = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);

    setPreviewImages(newImages);
    setDraggedIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (previewImages.length === 0) return alert("Please upload at least one image.");
    
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Basic Fields (automatically catches inStock and readingTime)
      Object.keys(form).forEach(key => {
        if (key === 'bookDetails') {
          formData.append(key, JSON.stringify(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      });

      // 🔥 Map images to mainImage and galleryImages based on order
      const mainImgObj = previewImages[0];
      const galleryImgObjs = previewImages.slice(1);

      // Handle Main Image
      if (mainImgObj.isExisting) {
        formData.append("existingMainImage", mainImgObj.url);
      } else {
        formData.append("mainImage", mainImgObj.file);
      }

      // Handle Gallery Images
      const existingGallery = [];
      galleryImgObjs.forEach(img => {
        if (img.isExisting) {
          existingGallery.push(img.url);
        } else {
          formData.append("galleryImages", img.file);
        }
      });
      formData.append("existingGalleryImages", JSON.stringify(existingGallery));

      if (mode === "add") {
        await createProduct(formData);
      } else {
        await updateProduct(productId, formData);
      }

      alert("Product saved successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#C58A5A]"><Loader2 className="w-10 h-10 animate-spin" /></div>;

  const InputClass = "w-full border border-[#FFE7D1] bg-[#FFF6ED] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] transition-all text-[#7a4f2b]";
  const LabelClass = "block text-sm font-bold mb-2 flex items-center gap-2";
  const CardClass = "bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-6 md:p-8 mb-8";

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10  text-[#7a4f2b]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <PackagePlus className="w-8 h-8 text-[#C58A5A]" />
            {mode === "add" ? "Add New Book" : "Edit Book"}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              
              {/* BASIC INFO */}
              <div className={CardClass}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#FFE7D1] pb-4">
                  <Info className="w-5 h-5 text-[#C58A5A]" /> Basic Information
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className={LabelClass}>Book Title</label>
                    <input value={form.title} onChange={(e) => handleChange("title", e.target.value)} className={InputClass} required />
                  </div>
                  <div>
                    <label className={LabelClass}>Author</label>
                    <input value={form.writer} onChange={(e) => handleChange("writer", e.target.value)} className={InputClass} required />
                  </div>
                  <div>
                    <label className={LabelClass}>Description</label>
                    <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} className={`${InputClass} min-h-[120px]`} required />
                  </div>
                  <div>
                    <label className={LabelClass}>Special Note (Optional)</label>
                    <textarea placeholder="e.g. हमारा नोट: हमने यह किताब तीन बार पढ़ी है..." value={form.note} onChange={(e) => handleChange("note", e.target.value)} className={`${InputClass} min-h-[80px] resize-y`} />
                  </div>
                </div>
              </div>

              {/* MEDIA */}
              <div className={CardClass}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#FFE7D1] pb-4">
                  <ImageIcon className="w-5 h-5 text-[#C58A5A]" /> Media
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Main Cover Slot */}
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-bold uppercase text-[#C58A5A] mb-2 block">Main Cover</label>
                    {previewImages.length > 0 ? (
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-4 border-[#C58A5A] group shadow-md"
                        draggable onDragStart={() => handleDragStart(0)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 0)}>
                        <img src={previewImages[0].url} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeImage(previewImages[0].id)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        <div className="absolute bottom-0 inset-x-0 bg-[#C58A5A] text-white text-[10px] text-center py-1 font-bold uppercase">Main</div>
                      </div>
                    ) : (
                      <div onClick={() => fileInputRef.current?.click()} className="aspect-[3/4] rounded-xl border-2 border-dashed border-[#C58A5A] bg-[#FFF6ED] flex flex-col items-center justify-center cursor-pointer">
                        <UploadCloud className="w-6 h-6 text-[#C58A5A] mb-1" />
                        <span className="text-[10px] font-bold">Upload</span>
                      </div>
                    )}
                  </div>

                  {/* Gallery Slots */}
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold uppercase text-[#C58A5A] mb-2 block">Gallery (Drag to reorder)</label>
                    <div className="grid grid-cols-3 gap-3">
                      {previewImages.slice(1).map((img, idx) => {
                        const actualIdx = idx + 1;
                        return (
                          <div key={img.id} draggable onDragStart={() => handleDragStart(actualIdx)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, actualIdx)}
                            className="relative aspect-square rounded-xl overflow-hidden border border-[#FFE7D1] bg-white group cursor-move">
                            <img src={img.url} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removeImage(img.id)} className="absolute top-1 right-1 bg-white/80 text-red-500 p-1 rounded-md opacity-0 group-hover:opacity-100"><Trash2 className="w-3 h-3"/></button>
                            <GripVertical className="absolute top-1 left-1 text-gray-800 bg-white/50 rounded-sm w-5 h-5"/>
                          </div>
                        );
                      })}
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-[#FFE7D1] bg-[#FFF6ED] flex items-center justify-center text-[#C58A5A]">
                        <PackagePlus className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <input type="file" multiple ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
              </div>

              {/* BOOK SPECS */}
              <div className={CardClass}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#FFE7D1] pb-4">
                  <FileText className="w-5 h-5 text-[#C58A5A]" /> Physical Specs
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(form.bookDetails).map((detail) => (
                    <div key={detail}>
                      <label className="block text-xs font-bold capitalize mb-1 text-gray-500">{detail.replace(/([A-Z])/g, ' $1')}</label>
                      <input value={form.bookDetails[detail]} onChange={(e) => handleBookDetails(detail, e.target.value)} className={InputClass} placeholder={`Enter ${detail}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-8">
              
              {/* PRICING & TIME */}
              <div className={CardClass}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#FFE7D1] pb-4">
                  <IndianRupee className="w-5 h-5 text-[#C58A5A]" /> Pricing & Time
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={LabelClass}>Selling Price (₹)</label>
                    <input type="number" value={form.price} onChange={(e) => handleChange("price", e.target.value)} className={InputClass} required />
                  </div>
                  <div>
                    <label className={LabelClass}>Original Price (₹)</label>
                    <input type="number" value={form.originalPrice} onChange={(e) => handleChange("originalPrice", e.target.value)} className={InputClass} />
                  </div>
                  
                  {/* 🔥 ADDED READING TIME */}
                  <div className="pt-2">
                    <label className={LabelClass}>
                      <Clock className="w-4 h-4 text-[#C58A5A]" /> Reading Time Estimator
                    </label>
                    <input placeholder="e.g. 6 - 8 Evenings" value={form.readingTime} onChange={(e) => handleChange("readingTime", e.target.value)} className={InputClass} />
                  </div>
                </div>
              </div>

              {/* ORGANIZATION & INVENTORY */}
              <div className={CardClass}>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-[#FFE7D1] pb-4">
                  <Tag className="w-5 h-5 text-[#C58A5A]" /> Organization
                </h2>
                <div className="space-y-4">
                  
                  {/* 🔥 ADDED IN STOCK DROPDOWN */}
                  <div>
                    <label className={LabelClass}>Inventory Status</label>
                    <select value={form.inStock} onChange={(e) => handleChange("inStock", e.target.value === "true")} className={InputClass}>
                      <option value="true">In Stock</option>
                      <option value="false">Out of Stock</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className={LabelClass}>Category</label>
                    <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value, subCategory: ""})} className={InputClass} required>
                      <option value="">Select Category</option>
                      {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.nameEnglish}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LabelClass}>SubCategory</label>
                    <select value={form.subCategory} onChange={(e) => handleChange("subCategory", e.target.value)} className={InputClass} required disabled={!form.category}>
                      <option value="">Select Sub</option>
                      {filteredSubs.map(sub => <option key={sub._id} value={sub._id}>{sub.title}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sticky top-10">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#7a4f2b] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#5e3c20] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="animate-spin w-6 h-6"/> : <><Save className="w-6 h-6"/> Save Book</>}
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}