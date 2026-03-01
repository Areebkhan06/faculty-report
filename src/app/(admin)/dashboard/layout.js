"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = [
    { name: "Overview", path: "/dashboard" },
    { name: "Faculty", path: "/dashboard/faculty" },
    { name: "Students", path: "/dashboard/students" },
    { name: "Fees", path: "/dashboard/fees" },
    { name: "Activities", path: "/dashboard/activities" },
  ];

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
  className={`
    fixed md:relative
    z-50 top-0 left-0
    h-screen w-64
    bg-slate-900 border-r border-slate-800 p-6
    overflow-y-auto
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
>
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <h2 className="text-xl font-bold">EduPanel</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Desktop Logo */}
        <h2 className="hidden md:block text-xl font-bold mb-8">EduPanel</h2>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                block px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  pathname === link.path
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top Navbar (Mobile + Tablet) */}
        <header className="flex items-center justify-between md:hidden bg-slate-900 border-b border-slate-800 p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div />
        </header>

        {/* Page Content */}
       <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
