"use client";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      <h2 className="text-lg font-semibold text-[#C58A5A]">
        Bodhi Prakashan Admin
      </h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Admin
        </span>

        <div className="w-8 h-8 bg-[#FFD3AC] rounded-full flex items-center justify-center text-[#7a4f2b] text-sm font-semibold">
          A
        </div>

        <button
          className="text-sm px-3 py-1.5 border border-[#C58A5A] text-[#C58A5A] rounded-md hover:bg-[#FFD3AC] transition"
        >
          Logout
        </button>
      </div>

    </header>
  );
}