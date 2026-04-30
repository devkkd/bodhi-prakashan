'use client';

import { useEffect, useState } from "react";
import {
    getCategories,
    getSubCategories,
    createSubCategory,
    deleteSubCategory
} from "@/lib/api";
import { Trash2, Plus, Loader2, FolderTree, FilePlus } from "lucide-react";

export default function SubCategoryAdmin() {
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);

    const [form, setForm] = useState({
        title: "",
        category: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🔥 Fetch all
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const catRes = await getCategories();
            const subRes = await getSubCategories();

            setCategories(catRes.data || []);
            setSubs(subRes.data || []);
        } catch (err) {
            console.error("ERROR:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔥 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.category) {
            alert("Please provide a title and select a category.");
            return;
        }

        try {
            setIsSubmitting(true);
            await createSubCategory(form);
            setForm({ title: "", category: "" });
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to add subcategory.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 🔥 Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

        try {
            await deleteSubCategory(id);
            fetchData();
        } catch (err) {
            console.error(err);
            alert("Failed to delete subcategory.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10 font-sans text-[#7a4f2b]">
            <div className="max-w-4xl mx-auto">
                
                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <FolderTree className="w-8 h-8 text-[#C58A5A]" />
                        SubCategory Management
                    </h1>
                    <p className="text-[#C58A5A] mt-2 font-medium">Add, view, and organize subcategories for your products.</p>
                </div>

                {/* ADD SUBCATEGORY FORM CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-6 md:p-8 mb-10">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <FilePlus className="w-5 h-5 text-[#C58A5A]" />
                        Add New SubCategory
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full">
                            <label className="block text-sm font-bold mb-2">Subcategory Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Science Fiction"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className="w-full border border-[#FFE7D1] bg-[#FFF6ED] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all text-[15px] placeholder-[#C58A5A] placeholder-opacity-60"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-bold mb-2">Parent Category</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full border border-[#FFE7D1] bg-[#FFF6ED] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD3AC] focus:border-[#C58A5A] transition-all text-[15px] text-[#7a4f2b]"
                                disabled={isSubmitting}
                            >
                                <option value="">Select Category</option>
                                {categories && categories.length > 0 ? (
                                    categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.nameHindi} / {cat.nameEnglish}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No categories found</option>
                                )}
                            </select>
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

                {/* SUBCATEGORIES LIST CARD */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] overflow-hidden">
                    <div className="px-6 py-5 border-b border-[#FFE7D1] bg-[#FFF6ED] flex justify-between items-center">
                        <h2 className="text-lg font-bold">Existing SubCategories</h2>
                        <span className="bg-[#FFD3AC] text-[#7a4f2b] text-xs font-bold px-3 py-1 rounded-full">
                            {subs.length} Total
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="p-10 flex justify-center items-center text-[#C58A5A]">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : subs.length === 0 ? (
                        <div className="p-10 text-center text-[#C58A5A] font-medium">
                            No subcategories found. Add one above.
                        </div>
                    ) : (
                        <div className="divide-y divide-[#FFE7D1]">
                            {subs.map(sub => (
                                <div
                                    key={sub._id}
                                    className="flex items-center justify-between p-4 px-6 hover:bg-[#FFF6ED] transition-colors group"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-[16px] font-bold">
                                            {sub.title}
                                        </span>
                                        <span className="text-[14px] font-medium text-[#C58A5A] flex items-center gap-1.5 mt-0.5">
                                            <FolderTree className="w-3.5 h-3.5" />
                                            {sub.category?.nameEnglish || "Unknown Category"}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(sub._id)}
                                        className="p-2.5 text-[#C58A5A] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                                        title="Delete Subcategory"
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