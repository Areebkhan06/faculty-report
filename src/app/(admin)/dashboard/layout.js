"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  Wallet,
  Zap,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

const links = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Faculty", path: "/dashboard/faculty", icon: Users },
  { name: "Students", path: "/dashboard/students", icon: GraduationCap },
  { name: "Fees", path: "/dashboard/fees", icon: Wallet },
  { name: "Activities", path: "/dashboard/activities", icon: Zap },
];

const admin = {
  name: "Dr. Ananya Sharma",
  role: "Administrator",
  initials: "AS",
  dept: "Computer Science",
};

const getCurrentMonth = () => {
  const now = new Date();
  return (
    now.toLocaleString("en-US", { month: "short" }) + " " + now.getFullYear()
  );
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);


const handleLogout = async () => {
  const logoutPromise = fetch("http://localhost:3560/api/logout-admin", {
    method: "POST",
    credentials: "include",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Logout failed");
    }
    return res.json();
  });

  toast.promise(logoutPromise, {
    pending: "Logging out...",
    success: "Logged out successfully",
    error: "Something went wrong ❌",
  });

  try {
    await logoutPromise;
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

  const currentPage =
    links.find((l) => l.path === pathname)?.name ?? "Dashboard";

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
      `}</style>

      {/* ── Mobile Overlay ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
        fixed md:relative z-50 top-0 left-0
        h-screen w-64 shrink-0
        bg-slate-900 border-r border-slate-800
        flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-extrabold text-xs">EP</span>
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight">
                EduPanel
              </span>
              <p className="text-xs text-slate-600 mono leading-none mt-0.5">
                v2.0
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-indigo-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Month badge */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="mono text-xs text-indigo-400 font-medium">
              {getCurrentMonth()}
            </span>
            <span className="text-xs text-slate-600 ml-auto">Live</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 pt-4 space-y-1 overflow-y-auto">
          <p className="text-xs text-slate-600 uppercase tracking-widest mono px-3 mb-2">
            Menu
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }
                `}
              >
                <Icon
                  size={16}
                  className={
                    isActive
                      ? "text-indigo-200"
                      : "text-indigo-400 group-hover:text-slate-300"
                  }
                />
                <span>{link.name}</span>
                {isActive && (
                  <ChevronRight size={14} className="ml-auto text-indigo-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin profile */}
        <div className="px-4 pb-5 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {admin.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {admin.name.split(" ").slice(-1)[0]}
              </p>
              <p className="text-xs text-indigo-400 truncate">{admin.role}</p>
            </div>
            <LogOut
            onClick={handleLogout}
              size={14}
              className="text-slate-600 group-hover:text-rose-400 transition-colors shrink-0"
            />
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="shrink-0 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-600 text-sm hidden sm:block">
              Dashboard
            </span>
            <ChevronRight
              size={14}
              className="text-slate-700 hidden sm:block"
            />
            <span className="text-sm font-semibold text-white truncate">
              {currentPage}
            </span>
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-400" />
            </button>

            {/* Admin avatar (desktop) */}
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-800 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-slate-700 transition-colors">
              <div className="w-6 h-6 rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                {admin.initials}
              </div>
              <span className="text-sm font-medium text-slate-200">
                {admin.name.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="text-xs text-indigo-400 mono bg-indigo-500/15 text-indigo-400 px-1.5 py-0.5 rounded-md border border-indigo-500/20">
                admin
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
