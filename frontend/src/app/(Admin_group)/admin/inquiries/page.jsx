'use client';

import React, { useEffect, useState } from "react";
import { getAdminInquiries, updateInquiryStatus } from "@/lib/api";
import { 
  MessageSquare, Mail, Phone, MapPin, 
  CheckCircle, Loader2, Calendar, Clock 
} from "lucide-react";

export default function InquiriesAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminInquiries();
      setInquiries(res.data || []);
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      // Optimistically update the UI
      setInquiries((prev) => 
        prev.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq)
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit"
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved": return "bg-green-100 text-green-700 border-green-200";
      case "read": return "bg-blue-100 text-blue-700 border-blue-200";
      case "new": 
      default: return "bg-orange-100 text-orange-700 border-orange-200 animate-pulse";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 md:p-10  text-[#7a4f2b]">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-[#C58A5A]" />
              Inquiries Management
            </h1>
            <p className="text-[#C58A5A] mt-2 font-medium">Read and manage customer messages from the contact form.</p>
          </div>
          <div className="bg-[#FFF6ED] border border-[#FFE7D1] px-4 py-2 rounded-xl font-bold shadow-sm">
            Total: {inquiries.length}
          </div>
        </div>

        {/* CONTENT */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-[#C58A5A]">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-semibold">Loading messages...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-[#FFE7D1] p-16 text-center">
            <MessageSquare className="w-16 h-16 text-[#FFD3AC] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Inquiries Found</h3>
            <p className="text-[#C58A5A]">Your inbox is completely clear.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {inquiries.map((inq) => (
              <div 
                key={inq._id} 
                className={`bg-white rounded-2xl shadow-sm border p-6 md:p-8 transition-all duration-200
                  ${inq.status === 'new' ? 'border-[#FCA57D] shadow-md' : 'border-[#FFE7D1]'}`}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  
                  {/* LEFT: User Details */}
                  <div className="w-full md:w-[300px] shrink-0 border-b md:border-b-0 md:border-r border-[#FFE7D1] pb-6 md:pb-0 md:pr-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-black text-gray-900 capitalize">
                        {inq.firstName} {inq.lastName}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStatusBadge(inq.status)}`}>
                        {inq.status || "new"}
                      </span>
                    </div>

                    <div className="space-y-3 text-[14px] font-medium text-gray-600">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-[#C58A5A]" />
                        <a href={`mailto:${inq.email}`} className="hover:text-[#7a4f2b] transition-colors">{inq.email}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#C58A5A]" />
                        <a href={`tel:${inq.phone}`} className="hover:text-[#7a4f2b] transition-colors">{inq.phone}</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#C58A5A]" />
                        <span className="capitalize">{inq.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Message & Actions */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(inq.createdAt)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatTime(inq.createdAt)}</span>
                    </div>

                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-bold text-[#C58A5A] uppercase tracking-wider mb-2">Subject: {inq.subject}</h4>
                      <p className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap bg-[#FFF6ED] p-4 rounded-xl border border-[#FFE7D1]">
                        {inq.message}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                      {inq.status !== 'resolved' && (
                        <button
                          onClick={() => handleStatusChange(inq._id, 'resolved')}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm"
                        >
                          <CheckCircle className="w-4 h-4" /> Mark Resolved
                        </button>
                      )}
                      
                      {inq.status === 'new' && (
                        <button
                          onClick={() => handleStatusChange(inq._id, 'read')}
                          className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}