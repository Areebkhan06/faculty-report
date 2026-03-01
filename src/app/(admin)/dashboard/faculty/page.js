import Link from "next/link"

const faculty = [
  
  { _id: "f1", name: "Dr. Ananya Sharma", email: "ananya@edu.in", department: "Computer Science", role: "admin",  performanceScore: 92 },
  { _id: "f2", name: "Prof. Rohan Mehta",  email: "rohan@edu.in",  department: "Mathematics",       role: "faculty", performanceScore: 78 },
  { _id: "f3", name: "Dr. Priya Nair",     email: "priya@edu.in",  department: "Physics",            role: "faculty", performanceScore: 85 },
  { _id: "f4", name: "Prof. Karan Joshi",  email: "karan@edu.in",  department: "Electronics",        role: "faculty", performanceScore: 70 },
]

const deptColors = {
  "Computer Science": { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20", dot: "bg-indigo-400" },
  "Mathematics":      { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", dot: "bg-violet-400" },
  "Physics":          { bg: "bg-cyan-500/10",   text: "text-cyan-400",   border: "border-cyan-500/20",   dot: "bg-cyan-400"   },
  "Electronics":      { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/20",  dot: "bg-amber-400"  },
}

const scoreColor = (s) =>
  s >= 90 ? "from-emerald-500 to-teal-400" :
  s >= 75 ? "from-indigo-500 to-violet-400" :
  s >= 60 ? "from-amber-500 to-orange-400" :
             "from-rose-500 to-pink-400"

const initials = (name) => name.split(" ").filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join("")

export default function FacultyPage() {
  const avg = Math.round(faculty.reduce((s, f) => s + f.performanceScore, 0) / faculty.length)
  const top = [...faculty].sort((a, b) => b.performanceScore - a.performanceScore)[0]

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
      *, body { font-family: 'DM Sans', sans-serif; }
      .mono { font-family: 'DM Mono', monospace; }`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mono mb-1">Institution Panel</p>
          <h1 className="text-3xl font-bold text-white">Faculty Directory</h1>
          <p className="text-slate-400 text-sm mt-1">{faculty.length} members across {new Set(faculty.map(f => f.department)).size} departments</p>
        </div>
        {/* Quick stats */}
        <div className="flex gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <div className="mono text-lg font-bold text-white">{avg}</div>
            <div className="text-xs text-slate-500">Avg Score</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <div className="mono text-lg font-bold text-emerald-400">{top.performanceScore}</div>
            <div className="text-xs text-slate-500">Top Score</div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {faculty.map((f, i) => {
          const dept = deptColors[f.department] ?? deptColors["Mathematics"]
          const pct  = f.performanceScore

          return (
            <Link href={`/dashboard/faculty/a`}
              key={f._id}
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

              {/* Top row */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-xl ${dept.bg} border ${dept.border} flex items-center justify-center shrink-0`}>
                  <span className={`text-sm font-bold mono ${dept.text}`}>{initials(f.name)}</span>
                </div>

                {/* Name + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-semibold text-white leading-tight">{f.name}</h2>
                    {f.role === "admin" && (
                      <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                        admin
                      </span>
                    )}
                  </div>
                  <p className="mono text-xs text-slate-500 mt-0.5">{f.email}</p>
                  <div className={`inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${dept.bg} ${dept.text} border ${dept.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dept.dot}`} />
                    {f.department}
                  </div>
                </div>

                {/* Score badge */}
                <div className="shrink-0 text-right">
                  <div className={`mono text-2xl font-bold bg-gradient-to-br ${scoreColor(pct)} bg-clip-text text-transparent`}>
                    {pct}
                  </div>
                  <div className="text-xs text-slate-600 mono">/100</div>
                </div>
              </div>

              {/* Performance bar */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-500">Performance Score</span>
                  <span className="mono text-xs text-slate-400">{pct >= 90 ? "Excellent" : pct >= 75 ? "Good" : pct >= 60 ? "Average" : "Needs Work"}</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${scoreColor(pct)} transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Rank indicator */}
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Rank <span className="text-slate-300 font-semibold">#{[...faculty].sort((a,b) => b.performanceScore - a.performanceScore).findIndex(x => x._id === f._id) + 1}</span> of {faculty.length}
                </span>
                {i === 0 && (
                  <span className="text-xs text-slate-500 mono">Member since 2024</span>
                )}
                <button className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                  View Profile →
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}