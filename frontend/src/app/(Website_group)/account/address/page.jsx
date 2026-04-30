'use client';

import React, { useEffect, useState } from "react";
import { getAddresses, addAddress } from "@/lib/api";
import MyAccSidebar from '@/components/MyAccSidebar';
import { useAuth } from '@/context/AuthContext';

const AddressPage = () => {
    const { logout } = useAuth();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); // 🔥 Added toggle for clean UI

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        pincode: "",
        city: "",
        state: "",
        addressLine: "",
    });

    // 🔥 Fetch addresses
    const fetchAddresses = async () => {
        try {
            const res = await getAddresses();
            // console.log("ADDRESS RESPONSE:", res.data); // 👈 ADD THIS
            setAddresses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    // 🔥 Handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // 🔥 Add address
    const handleAddAddress = async () => {
        try {
            await addAddress(form);
            setForm({
                fullName: "",
                phone: "",
                pincode: "",
                city: "",
                state: "",
                addressLine: "",
            });
            fetchAddresses(); // refresh
            setShowForm(false); // Close form on success
        } catch (err) {
            console.error(err);
            alert("Failed to add address");
        }
    };

    if (loading) return <div className="p-20 text-center">Loading Addresses...</div>;

    return (
        <div className="min-h-screen bg-[#FFFEF5] pt-[230px] pb-20 px-4 lg:px-8">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12">

                {/* LEFT SIDEBAR */}
                <MyAccSidebar logout={logout} />

                {/* RIGHT CONTENT */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Address Book / मेरे पते</h1>
                    <div className="h-[1px] bg-gray-200 mb-10 w-full" />

                    {/* 🔥 Existing Addresses Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
                        {addresses.length === 0 ? (
                            <p className="text-gray-500">No addresses found.</p>
                        ) : (
                            addresses.map((addr, i) => (
                                <div key={i} className="relative p-6 border border-gray-300 rounded-[20px] bg-transparent">
                                    {/* Highlight the first address as 'Default' to match design */}
                                    {i === 0 && (
                                        <span className="absolute top-6 right-6 bg-[#FFB684] text-gray-900 px-5 py-1.5 rounded-full text-[13px] font-medium">
                                            Default
                                        </span>
                                    )}

                                    <p className="font-bold text-gray-900 text-lg mb-4">{addr.fullName}</p>
                                    <div className="space-y-1.5 text-[15px] text-gray-800">
                                        <p>{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p>{addr.phone}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="h-[1px] bg-gray-200 mb-10 w-full" />

                    {/* 🔥 Add New Address Toggle Button */}
                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-8 py-3 rounded-full border border-gray-300 text-[#FF5A00] font-medium hover:bg-orange-50 transition-colors bg-transparent"
                        >
                            +Add New Address
                        </button>
                    ) : (
                        /* 🔥 Add Address Form */
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Address Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900"
                                />
                                <input
                                    name="phone"
                                    placeholder="Phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900"
                                />
                                <input
                                    name="addressLine"
                                    placeholder="Address Line (House No, Street)"
                                    value={form.addressLine}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900 col-span-1 md:col-span-2"
                                />
                                <input
                                    name="city"
                                    placeholder="City"
                                    value={form.city}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900"
                                />
                                <input
                                    name="state"
                                    placeholder="State"
                                    value={form.state}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900"
                                />
                                <input
                                    name="pincode"
                                    placeholder="Pincode"
                                    value={form.pincode}
                                    onChange={handleChange}
                                    className="w-full border-b border-gray-300 pb-2 bg-transparent outline-none focus:border-orange-500 placeholder:text-gray-400 text-gray-900 md:col-span-2"
                                />
                            </div>

                            <div className="flex gap-4 mt-10">
                                <button
                                    onClick={handleAddAddress}
                                    className="px-8 py-3 bg-[#FFB684] text-gray-900 font-bold rounded-full hover:shadow-md transition-all active:scale-95"
                                >
                                    Save Address
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-8 py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AddressPage;