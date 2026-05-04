'use client';

import { useEffect, useState } from "react";
import { getCategories, createCategory, deleteCategory } from "@/lib/api";
import { Trash2, Plus, Folder, Loader2, FolderPlus } from "lucide-react";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    nameHindi: "",
    nameEnglish: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔥 Fetch
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔥 Add
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nameHindi.trim() || !form.nameEnglish.trim()) {
      alert("Please fill in both Hindi and English names.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createCategory(form);
      setForm({ nameHindi: "", nameEnglish: "" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to add category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10  text-[#7a4f2b]">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <Folder className="w-8 h-8 text-[#C58A5A]" />
            Category Management
          </h1>
          <p className="text-[#C58A5A] mt-2 font-medium">Add, view, and organize book categories.</p>
        </div>

        {/* ADD CATEGORY FORM CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-6 md:p-8 mb-10">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FolderPlus className="w-5 h-5 text-[#C58A5A]" />
            Add New Category
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full">
              <label className="block text-sm font-bold mb-2">Category Name (Hindi)</label>
              <input
                type="text"
                placeholder="e.g. उपन्यास"
                value={form.nameHindi}
                onChange={(e) => setForm({ ...form, nameHindi: e.target.value })}
                className="w-full border border-[#FFE7D1] bg-[#FFF6ED] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all text-[15px] placeholder-[#C58A5A] placeholder-opacity-60"
                disabled={isSubmitting}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-bold mb-2">Category Name (English)</label>
              <input
                type="text"
                placeholder="e.g. Novel"
                value={form.nameEnglish}
                onChange={(e) => setForm({ ...form, nameEnglish: e.target.value })}
                className="w-full border border-[#FFE7D1] bg-[#FFF6ED] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all text-[15px] placeholder-[#C58A5A] placeholder-opacity-60"
                disabled={isSubmitting}
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#7a4f2b] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5e3c20] transition-colors flex items-center justify-center gap-2 h-[50px] shrink-0 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" /> Add
                </>
              )}
            </button>
          </form>
        </div>

        {/* CATEGORIES LIST CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#FFE7D1] bg-[#FFF6ED] flex justify-between items-center">
            <h2 className="text-lg font-bold">Existing Categories</h2>
            <span className="bg-[#FFD3AC] text-[#7a4f2b] text-xs font-bold px-3 py-1 rounded-full">
              {categories.length} Total
            </span>
          </div>

          {isLoading ? (
            <div className="p-10 flex justify-center items-center text-[#C58A5A]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <div className="p-10 text-center text-[#C58A5A] font-medium">
              No categories found. Add one above.
            </div>
          ) : (
            <div className="divide-y divide-[#FFE7D1]">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex items-center justify-between p-4 px-6 hover:bg-[#FFF6ED] transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold">
                      {cat.nameHindi}
                    </span>
                    <span className="text-[14px] font-medium text-[#C58A5A]">
                      {cat.nameEnglish}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2.5 text-[#C58A5A] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                    title="Delete Category"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}