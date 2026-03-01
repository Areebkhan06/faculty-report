"use client"
import { useState } from "react"

// ── Static Data ──────────────────────────────────────────────────────────────
const fees = [
  { _id: "fee1",  student: "Aarav Singh",   faculty: "Dr. Ananya Sharma", month: "Jan-2026", amount: 5000, paid: true,  paymentDate: "2026-01-05" },
  { _id: "fee2",  student: "Diya Kapoor",   faculty: "Prof. Rohan Mehta", month: "Jan-2026", amount: 4500, paid: true,  paymentDate: "2026-01-08" },
  { _id: "fee3",  student: "Ishaan Verma",  faculty: "Dr. Ananya Sharma", month: "Jan-2026", amount: 5000, paid: false, paymentDate: null },
  { _id: "fee4",  student: "Meera Pillai",  faculty: "Dr. Priya Nair",    month: "Jan-2026", amount: 5500, paid: true,  paymentDate: "2026-01-12" },
  { _id: "fee5",  student: "Yash Patel",    faculty: "Prof. Karan Joshi", month: "Jan-2026", amount: 4800, paid: false, paymentDate: null },
  { _id: "fee6",  student: "Sneha Reddy",   faculty: "Prof. Rohan Mehta", month: "Feb-2026", amount: 4500, paid: true,  paymentDate: "2026-02-07" },
  { _id: "fee7",  student: "Arjun Nambiar", faculty: "Prof. Karan Joshi", month: "Feb-2026", amount: 4800, paid: false, paymentDate: null },
  { _id: "fee8",  student: "Kavya Menon",   faculty: "Prof. Rohan Mehta", month: "Feb-2026", amount: 4500, paid: true,  paymentDate: "2026-02-14" },
  { _id: "fee9",  student: "Aarav Singh",   faculty: "Dr. Ananya Sharma", month: "Feb-2026", amount: 5000, paid: true,  paymentDate: "2026-02-03" },
  { _id: "fee10", student: "Meera Pillai",  faculty: "Dr. Priya Nair",    month: "Feb-2026", amount: 5500, paid: false, paymentDate: null },
  { _id: "fee11", student: "Aarav Singh",   faculty: "Dr. Ananya Sharma", month: "Mar-2026", amount: 5000, paid: true,  paymentDate: "2026-03-01" },
  { _id: "fee12", student: "Diya Kapoor",   faculty: "Prof. Rohan Mehta", month: "Mar-2026", amount: 4500, paid: false, paymentDate: null },
  { _id: "fee13", student: "Ishaan Verma",  faculty: "Dr. Ananya Sharma", month: "Mar-2026", amount: 5000, paid: false, paymentDate: null },
  { _id: "fee14", student: "Yash Patel",    faculty: "Prof. Karan Joshi", month: "Mar-2026", amount: 4800, paid: true,  paymentDate: "2026-03-02" },
  { _id: "fee15", student: "Sneha Reddy",   faculty: "Prof. Rohan Mehta", month: "Mar-2026", amount: 4500, paid: false, paymentDate: null },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCurrentMonth = () => {
  const now = new Date()
  return now.toLocaleString("en-US", { month: "short" }) + "-" + now.getFullYear()
  // returns e.g. "Mar-2026"
}

const initials = (name) =>
  name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

const avatarGrads = [
  "from-indigo-500 to-violet-500", "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",     "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",  "from-violet-500 to-purple-600",
  "from-sky-500 to-cyan-400",      "from-fuchsia-500 to-pink-500",
]

// Unique months sorted newest → oldest
const allMonths = [...new Set(fees.map(f => f.month))].sort((a, b) => {
  const parse = (m) => { const [mon, yr] = m.split("-"); return new Date(`${mon} 1, ${yr}`) }
  return parse(b) - parse(a)
})

const getMonthStats = (month) => {
  const records    = fees.filter(f => f.month === month)
  const total      = records.reduce((s, f) => s + f.amount, 0)
  const collected  = records.filter(f => f.paid).reduce((s, f) => s + f.amount, 0)
  const paidCount  = records.filter(f => f.paid).length
  const pendingCount = records.length - paidCount
  const pct        = total ? Math.round((collected / total) * 100) : 0
  return { records, total, collected, pending: total - collected, paidCount, pendingCount, pct }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ paid }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
      paid ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
           : "bg-rose-500/10 text-rose-400 border-rose-500/20"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${paid ? "bg-emerald-400" : "bg-rose-400"}`} />
      {paid ? "Paid" : "Pending"}
    </span>
  )
}

function FeeTable({ records }) {
  if (!records.length)
    return <p className="text-center text-slate-600 text-sm py-12">No records for this month.</p>

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              {["Student", "Faculty", "Amount", "Payment Date", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((f, i) => (
              <tr key={f._id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${avatarGrads[i % avatarGrads.length]} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {initials(f.student)}
                    </div>
                    <span className="font-medium text-slate-200">{f.student}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">{f.faculty}</td>
                <td className="px-5 py-4 mono font-semibold text-slate-200">₹{f.amount.toLocaleString()}</td>
                <td className="px-5 py-4 mono text-xs text-slate-500">{f.paymentDate ?? <span className="text-slate-700">—</span>}</td>
                <td className="px-5 py-4"><StatusBadge paid={f.paid} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden divide-y divide-slate-800">
        {records.map((f, i) => (
          <div key={f._id} className="p-4 flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarGrads[i % avatarGrads.length]} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
              {initials(f.student)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-slate-200 text-sm">{f.student}</span>
                <StatusBadge paid={f.paid} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{f.faculty}</p>
              <div className="flex gap-4 mt-2">
                <span className="mono text-xs font-semibold text-slate-300">₹{f.amount.toLocaleString()}</span>
                {f.paymentDate && <span className="mono text-xs text-slate-500">{f.paymentDate}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FeesPage() {
  // 👇 Default is always current month — in real app this is the only month fetched on load
  const currentMonth = getCurrentMonth()
  const [activeMonth, setActiveMonth] = useState(currentMonth)

  const stats = getMonthStats(activeMonth)
  const isCurrentMonth = activeMonth === currentMonth

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mono mb-1">Institution Panel</p>
          <h1 className="text-3xl font-bold text-white">Fee Records</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-slate-400 text-sm">Viewing</p>
            <span className="mono text-sm font-bold text-indigo-400">{activeMonth}</span>
            {isCurrentMonth && (
              <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-medium animate-pulse">
                ● Live
              </span>
            )}
          </div>
        </div>

        {/* Quick totals */}
        <div className="flex gap-3 shrink-0">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5 text-center">
            <div className="mono text-lg font-bold text-emerald-400">₹{stats.collected.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Collected</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2.5 text-center">
            <div className="mono text-lg font-bold text-rose-400">₹{stats.pending.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Pending</div>
          </div>
        </div>
      </div>

      {/* ── Month Switcher ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-slate-500 uppercase tracking-widest mono">Month</p>
          {!isCurrentMonth && (
            <button
              onClick={() => setActiveMonth(currentMonth)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mono flex items-center gap-1"
            >
              ← Back to current month
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {allMonths.map(month => {
            const s        = getMonthStats(month)
            const isCurr   = month === currentMonth
            const isActive = month === activeMonth

            return (
              <button
                key={month}
                onClick={() => setActiveMonth(month)}
                className={`relative flex flex-col items-start px-4 py-3 rounded-xl border transition-all duration-200 min-w-[108px] group ${
                  isActive
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                {/* Current month pill */}
                {isCurr && (
                  <span className={`absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full font-bold mono ${
                    isActive ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"
                  }`}>
                    Now
                  </span>
                )}

                <span className="mono font-bold text-sm leading-tight">{month}</span>

                <span className={`text-xs mt-1 ${isActive ? "text-indigo-200" : "text-slate-600"}`}>
                  {s.paidCount}/{s.records.length} paid
                </span>

                {/* Mini progress bar */}
                <div className={`h-1 rounded-full mt-2 w-full ${isActive ? "bg-indigo-400/30" : "bg-slate-800"}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isActive ? "bg-white/80" : "bg-indigo-500/60"}`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total Billed", value: `₹${stats.total.toLocaleString()}`,      cls: "text-white",        bg: "bg-slate-900 border-slate-800" },
          { label: "Collected",    value: `₹${stats.collected.toLocaleString()}`,   cls: "text-emerald-400",  bg: "bg-emerald-950/40 border-emerald-900/50" },
          { label: "Pending",      value: `₹${stats.pending.toLocaleString()}`,     cls: "text-rose-400",     bg: "bg-rose-950/40 border-rose-900/50" },
          { label: "Collected %",  value: `${stats.pct}%`,                          cls: "text-indigo-400",   bg: "bg-indigo-950/40 border-indigo-900/50" },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-4 border ${c.bg}`}>
            <p className="text-xs text-slate-500 uppercase tracking-widest mono">{c.label}</p>
            <p className={`mono text-2xl font-bold mt-1 ${c.cls}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* ── Progress Bar ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-300">{activeMonth} — Collection Progress</span>
          <span className="mono text-sm text-slate-400">{stats.pct}%</span>
        </div>
        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-600">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{stats.paidCount} students paid</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" />{stats.pendingCount} pending</span>
        </div>
      </div>

      {/* ── Records Table ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-200">
              {activeMonth}
              {isCurrentMonth && <span className="ml-2 text-xs text-indigo-400">(Current Month)</span>}
            </h2>
            <p className="text-xs text-slate-600 mono mt-0.5">{stats.records.length} records</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{stats.paidCount} paid</span>
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" />{stats.pendingCount} pending</span>
          </div>
        </div>

        <FeeTable records={stats.records} />
      </div>

      {/* ── API Strategy Note ── */}
      {/* <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4">
        <p className="text-xs text-slate-500 font-semibold mb-1 uppercase tracking-widest mono">Real API Strategy</p>
        <p className="text-xs text-slate-600 leading-relaxed">
          On page load → fetch only{" "}
          <code className="mono bg-slate-800 text-indigo-400 px-1.5 py-0.5 rounded">GET /api/fees?month=Mar-2026</code>{" "}
          (current month). When user switches tab → fetch{" "}
          <code className="mono bg-slate-800 text-indigo-400 px-1.5 py-0.5 rounded">GET /api/fees?month=Feb-2026</code>.
          One request per tab switch — never loading all months at once.
        </p>
      </div> */}
    </div>
  )
}