"use client"
import { useState } from "react"

// ── Static Data ───────────────────────────────────────────────────────────────
const activities = [
  {
    _id: "a1", facultyId: "f1", faculty: "Dr. Ananya Sharma",
    title: "AI in Education", topic: "Machine Learning Fundamentals",
    description: "An interactive seminar exploring how AI tools are reshaping modern classrooms and personalized learning experiences.",
    activityType: "seminar", date: "2026-01-15", month: "Jan-2026", scoreWeight: 8,
  },
  {
    _id: "a2", facultyId: "f2", faculty: "Prof. Rohan Mehta",
    title: "Calculus Workshop", topic: "Differential Equations",
    description: "Hands-on problem solving session covering ODE techniques with real-world engineering applications.",
    activityType: "workshop", date: "2026-01-22", month: "Jan-2026", scoreWeight: 6,
  },
  {
    _id: "a3", facultyId: "f1", faculty: "Dr. Ananya Sharma",
    title: "DSA Bootcamp", topic: "Graphs & Trees",
    description: "Intensive extra class focusing on graph traversal algorithms, BFS, DFS and tree data structures.",
    activityType: "extra_class", date: "2026-02-05", month: "Feb-2026", scoreWeight: 5,
  },
  {
    _id: "a4", facultyId: "f3", faculty: "Dr. Priya Nair",
    title: "Quantum Research Initiative", topic: "Quantum Computing",
    description: "Faculty-led research exploration into quantum entanglement and its potential in computing paradigms.",
    activityType: "research", date: "2026-02-10", month: "Feb-2026", scoreWeight: 10,
  },
  {
    _id: "a5", facultyId: "f4", faculty: "Prof. Karan Joshi",
    title: "Circuit Design Expo", topic: "VLSI Design",
    description: "Students competed in designing low-power VLSI circuits; faculty provided technical mentorship throughout.",
    activityType: "competition", date: "2026-02-18", month: "Feb-2026", scoreWeight: 7,
  },
  {
    _id: "a6", facultyId: "f2", faculty: "Prof. Rohan Mehta",
    title: "Stats Project Help", topic: "Probability Theory",
    description: "One-on-one project guidance sessions helping students model statistical problems for their semester projects.",
    activityType: "project_guidance", date: "2026-02-20", month: "Feb-2026", scoreWeight: 5,
  },
  {
    _id: "a7", facultyId: "f1", faculty: "Dr. Ananya Sharma",
    title: "Open Source Contributions", topic: "Git & GitHub Workflows",
    description: "Workshop on contributing to open source, covering PRs, code reviews, and community collaboration.",
    activityType: "workshop", date: "2026-03-03", month: "Mar-2026", scoreWeight: 6,
  },
  {
    _id: "a8", facultyId: "f3", faculty: "Dr. Priya Nair",
    title: "Physics Olympiad Prep", topic: "Classical Mechanics",
    description: "Preparation sessions for national physics olympiad with focus on advanced mechanics and thermodynamics.",
    activityType: "extra_class", date: "2026-03-10", month: "Mar-2026", scoreWeight: 5,
  },
  {
    _id: "a9", facultyId: "f4", faculty: "Prof. Karan Joshi",
    title: "IoT Innovation Talk", topic: "Internet of Things",
    description: "Guest seminar on practical IoT applications in smart cities and industrial automation.",
    activityType: "seminar", date: "2026-03-15", month: "Mar-2026", scoreWeight: 8,
  },
]

// ── Config ────────────────────────────────────────────────────────────────────
const typeConfig = {
  seminar:          { label: "Seminar",          bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/20",  dot: "bg-violet-400",  glow: "shadow-violet-500/10"  },
  workshop:         { label: "Workshop",         bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20",    dot: "bg-blue-400",    glow: "shadow-blue-500/10"    },
  extra_class:      { label: "Extra Class",      bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400", glow: "shadow-emerald-500/10" },
  project_guidance: { label: "Project Guidance", bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/20",   dot: "bg-amber-400",   glow: "shadow-amber-500/10"   },
  competition:      { label: "Competition",      bg: "bg-rose-500/10",    text: "text-rose-400",    border: "border-rose-500/20",    dot: "bg-rose-400",    glow: "shadow-rose-500/10"    },
  research:         { label: "Research",         bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/20",    dot: "bg-cyan-400",    glow: "shadow-cyan-500/10"    },
  other:            { label: "Other",            bg: "bg-slate-500/10",   text: "text-slate-400",   border: "border-slate-500/20",   dot: "bg-slate-400",   glow: "shadow-slate-500/10"   },
}

const scoreGrad = (w) =>
  w >= 9 ? "from-cyan-400 to-teal-400" :
  w >= 7 ? "from-indigo-400 to-violet-400" :
  w >= 5 ? "from-amber-400 to-orange-400" :
           "from-rose-400 to-pink-400"

const allMonths   = ["all", ...[...new Set(activities.map(a => a.month))].sort((a, b) => {
  const p = m => { const [mn, yr] = m.split("-"); return new Date(`${mn} 1, ${yr}`) }
  return p(b) - p(a)
})]
const allTypes    = ["all", ...Object.keys(typeConfig)]
const initials    = (name) => name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

const facultyGrads = {
  "f1": "from-indigo-500 to-violet-500",
  "f2": "from-amber-500 to-orange-400",
  "f3": "from-cyan-500 to-blue-500",
  "f4": "from-emerald-500 to-teal-400",
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ActivitiesPage() {
  const [monthFilter, setMonthFilter] = useState("all")
  const [typeFilter,  setTypeFilter]  = useState("all")
  const [search,      setSearch]      = useState("")
  const [expanded,    setExpanded]    = useState(null)

  const filtered = activities.filter(a => {
    const mMatch = monthFilter === "all" || a.month === monthFilter
    const tMatch = typeFilter  === "all" || a.activityType === typeFilter
    const sMatch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                   a.faculty.toLowerCase().includes(search.toLowerCase()) ||
                   a.topic.toLowerCase().includes(search.toLowerCase())
    return mMatch && tMatch && sMatch
  })

  const totalScore = filtered.reduce((s, a) => s + a.scoreWeight, 0)

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mono mb-1">Institution Panel</p>
          <h1 className="text-3xl font-bold text-white">Activities</h1>
          <p className="text-slate-400 text-sm mt-1">
            {filtered.length} activities · total score weight{" "}
            <span className="mono text-indigo-400 font-bold">+{totalScore}</span>
          </p>
        </div>
        {/* Type breakdown pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeConfig).map(([key, cfg]) => {
            const count = activities.filter(a => a.activityType === key).length
            if (!count) return null
            return (
              <span key={key} className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {cfg.label} · {count}
              </span>
            )
          })}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="space-y-3 mb-8">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, faculty or topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Month filter */}
          <div className="flex gap-2 flex-wrap">
            {allMonths.map(m => (
              <button key={m} onClick={() => setMonthFilter(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium mono transition-all ${
                  monthFilter === m
                    ? "bg-indigo-600 text-white border border-indigo-500"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600"
                }`}>
                {m === "all" ? "All Months" : m}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600 transition-colors cursor-pointer"
          >
            <option value="all">All Types</option>
            {Object.entries(typeConfig).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl py-16 text-center text-slate-600 text-sm">
          No activities match your filters.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(a => {
            const cfg      = typeConfig[a.activityType] ?? typeConfig.other
            const isOpen   = expanded === a._id
            const grad     = facultyGrads[a.facultyId] ?? "from-slate-500 to-slate-600"

            return (
              <div
                key={a._id}
                className={`group relative bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer
                  ${isOpen ? "border-slate-600 shadow-xl" : "border-slate-800 hover:border-slate-700"}
                `}
                onClick={() => setExpanded(isOpen ? null : a._id)}
              >
                {/* Left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${cfg.dot}`} />

                <div className="p-5 pl-6">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                    {/* Score weight */}
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs text-slate-600">score</span>
                      <span className={`mono text-sm font-bold bg-gradient-to-r ${scoreGrad(a.scoreWeight)} bg-clip-text text-transparent`}>
                        +{a.scoreWeight}
                      </span>
                    </div>
                  </div>

                  {/* Title + topic */}
                  <h2 className="font-bold text-slate-100 mt-3 leading-tight">{a.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">{a.topic}</p>

                  {/* Description (expanded) */}
                  {isOpen && a.description && (
                    <p className="text-sm text-slate-400 mt-3 leading-relaxed border-t border-slate-800 pt-3">
                      {a.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                    {/* Faculty */}
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${grad} flex items-center justify-center text-xs font-bold text-white`}>
                        {initials(a.faculty)}
                      </div>
                      <span className="text-xs text-slate-500 truncate max-w-[120px]">{a.faculty}</span>
                    </div>

                    {/* Date + expand hint */}
                    <div className="flex items-center gap-2">
                      <span className="mono text-xs text-slate-600">{a.date}</span>
                      <span className={`text-xs text-slate-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Summary footer ── */}
      {filtered.length > 0 && (
        <div className="mt-6 bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-600 mono">
            Showing {filtered.length} of {activities.length} activities
          </span>
          <div className="flex flex-wrap gap-3">
            {Object.entries(typeConfig).map(([key, cfg]) => {
              const count = filtered.filter(a => a.activityType === key).length
              if (!count) return null
              return (
                <span key={key} className="text-xs text-slate-500 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}: {count}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}