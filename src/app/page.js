"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../../Context/AdminContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAdmin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields ❗");
      return;
    }

    const loginPromise = fetch("http://localhost:3560/api/login-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      return data;
    });

    toast.promise(loginPromise, {
      pending: "Logging in...",
      success: {
        render({ data }) {
          return data.message || "Login successful 🎉";
        },
      },
      error: {
        render({ data }) {
          return data.message || "Login failed ❌";
        },
      },
    });

    try {
      await loginPromise;

      // small delay so user sees success message
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Background FX ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -left-60 w-125 h-125 rounded-full bg-indigo-700/10 blur-3xl" />
        <div className="absolute -bottom-60 -right-60 w-125 h-125 rounded-full bg-violet-700/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative w-full max-w-112.5">
        {/* ── Logo ── */}
        <div className="flex flex-col items-center mb-8 select-none">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <span className="text-white font-extrabold text-2xl tracking-tighter">
                IICS
              </span>
            </div>
            {/* Admin shield badge */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
              <ShieldCheck size={13} className="text-indigo-400" />
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Indain Institute of Computer Science
          </h1>
          <p className="text-slate-500 text-xs mt-1 mono">
            Institution Management System
          </p>
        </div>

        {/* ── Admin-only notice ── */}
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-2.5 mb-6">
          <ShieldCheck size={14} className="text-indigo-400 shrink-0" />
          <p className="text-xs text-indigo-300 font-medium">
            This portal is restricted to{" "}
            <span className="font-bold">administrators</span> only
          </p>
        </div>

        {/* ── Card ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl shadow-black/50">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Admin Sign In</h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mono block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="admin@edupanel.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mono block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="••••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-300 transition-colors rounded-lg hover:bg-slate-700"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                <span className="text-rose-400 text-sm shrink-0 mt-px">✕</span>
                <p className="text-sm text-rose-300">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Footer ── */}
        <p className="text-center text-xs text-slate-700 mono mt-6">
          © {new Date().getFullYear()} IICS · Admin Access Only
        </p>
      </div>
    </div>
  );
}
