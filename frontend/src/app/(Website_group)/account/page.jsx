'use client';

import React, { useState, useEffect } from 'react';
import MyAccSidebar from '@/components/MyAccSidebar';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/lib/api';

const AccountPage = () => {
  const { user, loading, logout } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(form);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="pt-[140px] lg:pt-[250px] pb-20 text-center">Loading Profile...</div>;
  if (!user) return <div className="pt-[140px] lg:pt-[250px] pb-20 text-center">Please login to view this page.</div>;

  return (
    <div className="min-h-screen bg-[#FFFEF5] pt-[120px] lg:pt-[250px] pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Sidebar */}
        <MyAccSidebar logout={logout} />

        {/* Main Content */}
        <div className="flex-1 text-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            My Account / मेरा अकाउंट
          </h1>
          <div className="h-[1px] bg-gray-200 mb-6 sm:mb-10 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10">
            <div className="space-y-1 sm:space-y-2 border-b border-gray-300 pb-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-800">First Name / पहला नाम</label>
              <input 
                name="firstName" 
                value={form.firstName} 
                onChange={handleChange} 
                className="w-full bg-transparent outline-none text-[15px] sm:text-base py-1" 
              />
            </div>
            <div className="space-y-1 sm:space-y-2 border-b border-gray-300 pb-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-800">Last Name / अंतिम नाम</label>
              <input 
                name="lastName" 
                value={form.lastName} 
                onChange={handleChange} 
                className="w-full bg-transparent outline-none text-[15px] sm:text-base py-1" 
              />
            </div>
            <div className="space-y-1 sm:space-y-2 border-b border-gray-300 pb-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-800">Mobile / मोबाइल</label>
              <div className="text-[#FF5A00] font-medium text-[15px] sm:text-base py-1">{user.phone}</div>
            </div>
            <div className="space-y-1 sm:space-y-2 border-b border-gray-300 pb-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-800">Email Address / ईमेल पता</label>
              <input 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="w-full bg-transparent outline-none text-[15px] sm:text-base py-1" 
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-8 sm:mt-12 w-full md:w-auto px-8 sm:px-12 py-3.5 sm:py-4 bg-[#FFB684] text-gray-900 text-[15px] sm:text-base font-bold rounded-full hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default AccountPage;