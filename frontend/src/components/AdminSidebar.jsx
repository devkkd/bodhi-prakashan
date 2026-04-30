"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Folder,
  FolderTree,
  Package,
  Briefcase,
  Users,
  MessageSquare
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Folder },
    { name: "SubCategories", href: "/admin/subcategories", icon: FolderTree },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: Briefcase },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <aside className="w-72 bg-[#FFF6ED] text-[#7a4f2b] p-6 flex flex-col min-h-screen border-r border-[#FFE7D1]">

      {/* Logo */}
      <div className="mb-12 mx-auto">
        <img
          src="/images/mainlogo.svg"
          alt="Bodhi Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <span className="text-xs font-semibold text-[#C58A5A] uppercase mb-3 pl-3">
          Menu
        </span>

        {links.map((link) => {
          // Exact match for dashboard to prevent it from highlighting on all /admin/* routes
          const isActive = link.href === "/admin" 
            ? pathname === "/admin" 
            : pathname.startsWith(link.href);
            
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
                isActive
                  ? "bg-[#FFD3AC] text-[#7a4f2b] shadow-sm font-bold"
                  : "hover:bg-[#FFE7D1] text-[#C58A5A]"
              }`}
            >
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}