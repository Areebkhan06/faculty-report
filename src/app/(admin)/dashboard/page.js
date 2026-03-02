"use client"

// ── Static Data ───────────────────────────────────────────────────────────────

import { useAdmin } from "../../../../Context/AdminContext"

const faculty = [
  { _id: "f1", name: "Dr. Ananya Sharma", email: "ananya@edu.in", department: "Computer Science", role: "admin",  performanceScore: 92 },
  { _id: "f2", name: "Prof. Rohan Mehta",  email: "rohan@edu.in",  department: "Mathematics",       role: "faculty", performanceScore: 78 },
  { _id: "f3", name: "Dr. Priya Nair",     email: "priya@edu.in",  department: "Physics",            role: "faculty", performanceScore: 85 },
  { _id: "f4", name: "Prof. Karan Joshi",  email: "karan@edu.in",  department: "Electronics",        role: "faculty", performanceScore: 70 },
]

const students = [
  { _id: "s1", name: "Aarav Singh",   course: "B.Tech CSE",   facultyId: "f1", status: "active",  admissionDate: "2024-07-15" },
  { _id: "s2", name: "Diya Kapoor",   course: "B.Sc Math",    facultyId: "f2", status: "active",  admissionDate: "2024-07-20" },
  { _id: "s3", name: "Ishaan Verma",  course: "B.Tech CSE",   facultyId: "f1", status: "dropout", admissionDate: "2024-06-10" },
  { _id: "s4", name: "Meera Pillai",  course: "M.Sc Physics", facultyId: "f3", status: "active",  admissionDate: "2024-08-01" },
  { _id: "s5", name: "Yash Patel",    course: "B.Tech ECE",   facultyId: "f4", status: "active",  admissionDate: "2024-07-25" },
  { _id: "s6", name: "Sneha Reddy",   course: "M.Sc Math",    facultyId: "f2", status: "active",  admissionDate: "2024-09-05" },
]

const allFees = [
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

const allActivities = [
  { _id: "a1", facultyId: "f1", faculty: "Dr. Ananya Sharma",  title: "AI in Education",         topic: "Machine Learning",      activityType: "seminar",          date: "2026-01-15", month: "Jan-2026", scoreWeight: 8  },
  { _id: "a2", facultyId: "f2", faculty: "Prof. Rohan Mehta",  title: "Calculus Workshop",       topic: "Differential Equations", activityType: "workshop",         date: "2026-01-22", month: "Jan-2026", scoreWeight: 6  },
  { _id: "a3", facultyId: "f1", faculty: "Dr. Ananya Sharma",  title: "DSA Bootcamp",            topic: "Graphs & Trees",         activityType: "extra_class",      date: "2026-02-05", month: "Feb-2026", scoreWeight: 5  },
  { _id: "a4", facultyId: "f3", faculty: "Dr. Priya Nair",     title: "Quantum Research",        topic: "Quantum Computing",      activityType: "research",         date: "2026-02-10", month: "Feb-2026", scoreWeight: 10 },
  { _id: "a5", facultyId: "f4", faculty: "Prof. Karan Joshi",  title: "Circuit Design Expo",     topic: "VLSI Design",            activityType: "competition",      date: "2026-02-18", month: "Feb-2026", scoreWeight: 7  },
  { _id: "a6", facultyId: "f2", faculty: "Prof. Rohan Mehta",  title: "Stats Project Help",      topic: "Probability Theory",     activityType: "project_guidance", date: "2026-02-20", month: "Feb-2026", scoreWeight: 5  },
  { _id: "a7", facultyId: "f1", faculty: "Dr. Ananya Sharma",  title: "Open Source Workshop",    topic: "Git & GitHub",           activityType: "workshop",         date: "2026-03-03", month: "Mar-2026", scoreWeight: 6  },
  { _id: "a8", facultyId: "f3", faculty: "Dr. Priya Nair",     title: "Physics Olympiad Prep",   topic: "Classical Mechanics",    activityType: "extra_class",      date: "2026-03-10", month: "Mar-2026", scoreWeight: 5  },
  { _id: "a9", facultyId: "f4", faculty: "Prof. Karan Joshi",  title: "IoT Innovation Talk",     topic: "Internet of Things",     activityType: "seminar",          date: "2026-03-15", month: "Mar-2026", scoreWeight: 8  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
const getCurrentMonth = () => {
  const now = new Date()
  return now.toLocaleString("en-US", { month: "short" }) + "-" + now.getFullYear()
}

const CURRENT_MONTH = getCurrentMonth() // "Mar-2026"

const currentFees       = allFees.filter(f => f.month === CURRENT_MONTH)
const currentActivities = allActivities.filter(a => a.month === CURRENT_MONTH)

const totalFees     = currentFees.reduce((s, f) => s + f.amount, 0)
const collectedFees = currentFees.filter(f => f.paid).reduce((s, f) => s + f.amount, 0)
const pendingFees   = totalFees - collectedFees
const feeRate       = totalFees ? Math.round((collectedFees / totalFees) * 100) : 0

const activeStudents  = students.filter(s => s.status === "active").length
const dropoutStudents = students.filter(s => s.status === "dropout").length

const typeConfig = {
  seminar:          { label: "Seminar",          dot: "bg-violet-400", text: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  workshop:         { label: "Workshop",         dot: "bg-blue-400",   text: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20"   },
  extra_class:      { label: "Extra Class",      dot: "bg-emerald-400",text: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20"},
  project_guidance: { label: "Guidance",         dot: "bg-amber-400",  text: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  competition:      { label: "Competition",      dot: "bg-rose-400",   text: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20"   },
  research:         { label: "Research",         dot: "bg-cyan-400",   text: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20"   },
  other:            { label: "Other",            dot: "bg-slate-400",  text: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20" },
}

const deptColors = {
  "Computer Science": "from-indigo-500 to-violet-500",
  "Mathematics":      "from-amber-500 to-orange-400",
  "Physics":          "from-cyan-500 to-blue-500",
  "Electronics":      "from-emerald-500 to-teal-400",
}

const initials = (name) => name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

const scoreColor = (s) =>
  s >= 90 ? "text-emerald-400" : s >= 75 ? "text-indigo-400" : s >= 60 ? "text-amber-400" : "text-rose-400"

const scoreBarColor = (s) =>
  s >= 90 ? "from-emerald-500 to-teal-400" : s >= 75 ? "from-indigo-500 to-violet-400" : "from-amber-500 to-orange-400"




// ── Main ──────────────────────────────────────────────────────────────────────
export default function Overview() {
  const {user,token} = useAdmin();
  const now = new Date()
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mono mb-1">Admin Dashboard</p>
          <h1 className="text-3xl font-extrabold text-white leading-tight">Good morning, <span className="text-indigo-400">Ananya</span> 👋</h1>
          <p className="text-slate-500 text-sm mt-1">{dateStr}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="mono text-sm text-indigo-400 font-semibold">{CURRENT_MONTH}</span>
          <span className="text-xs text-slate-500 ml-1">— Current Period</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Faculty", value: faculty.length,
            sub: `${faculty.filter(f => f.role === "admin").length} admin · ${faculty.filter(f => f.role === "faculty").length} faculty`,
            icon: "👨‍🏫", accent: "border-indigo-900/50 bg-indigo-950/30", vcolor: "text-indigo-300"
          },
          {
            label: "Active Students", value: activeStudents,
            sub: `${dropoutStudents} dropout · ${students.length} total`,
            icon: "🎓", accent: "border-emerald-900/50 bg-emerald-950/30", vcolor: "text-emerald-300"
          },
          {
            label: "Fees Collected", value: `₹${collectedFees.toLocaleString()}`,
            sub: `${feeRate}% of ₹${totalFees.toLocaleString()} this month`,
            icon: "💰", accent: "border-amber-900/50 bg-amber-950/30", vcolor: "text-amber-300"
          },
          {
            label: "Activities", value: currentActivities.length,
            sub: `${currentActivities.reduce((s, a) => s + a.scoreWeight, 0)} total score pts`,
            icon: "⚡", accent: "border-violet-900/50 bg-violet-950/30", vcolor: "text-violet-300"
          },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl p-5 border ${c.accent} flex flex-col gap-3`}>
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 uppercase tracking-widest">{c.label}</p>
              <span className="text-xl">{c.icon}</span>
            </div>
            <p className={`mono text-3xl font-extrabold ${c.vcolor}`}>{c.value}</p>
            <p className="text-xs text-slate-600 leading-snug">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Fee Collection Banner ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">{CURRENT_MONTH} — Fee Collection</span>
              <span className="mono text-sm font-bold text-white">{feeRate}%</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-linear-to-r from-indigo-500 to-violet-500 transition-all duration-700" style={{ width: `${feeRate}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Collected ₹{collectedFees.toLocaleString()}</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" />Pending ₹{pendingFees.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="text-center">
              <p className="mono text-2xl font-bold text-emerald-400">{currentFees.filter(f => f.paid).length}</p>
              <p className="text-xs text-slate-500">Paid</p>
            </div>
            <div className="w-px bg-slate-800" />
            <div className="text-center">
              <p className="mono text-2xl font-bold text-rose-400">{currentFees.filter(f => !f.paid).length}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Row: Faculty Performance + Student Status ── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* Faculty Performance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Faculty Performance</h2>
            <span className="mono text-xs text-slate-500">{faculty.length} members</span>
          </div>
          <div className="divide-y divide-slate-800">
            {[...faculty].sort((a, b) => b.performanceScore - a.performanceScore).map((f, i) => (
              <div key={f._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/40 transition-colors">
                <span className="mono text-xs text-slate-700 w-4 shrink-0">#{i + 1}</span>
                <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${deptColors[f.department] ?? "from-slate-500 to-slate-600"} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {initials(f.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-200 truncate">{f.name}</p>
                    {f.role === "admin" && <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-1.5 py-px rounded-full shrink-0">admin</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-linear-to-r ${scoreBarColor(f.performanceScore)}`} style={{ width: `${f.performanceScore}%` }} />
                    </div>
                    <span className={`mono text-xs font-bold shrink-0 ${scoreColor(f.performanceScore)}`}>{f.performanceScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Status + Pending Fees */}
        <div className="flex flex-col gap-6">

          {/* Student breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Students</h2>
              <span className="mono text-xs text-slate-500">{students.length} enrolled</span>
            </div>
            <div className="px-5 py-4 grid grid-cols-3 gap-4">
              {[
                { label: "Total",   value: students.length,  color: "text-white",        bg: "bg-slate-800" },
                { label: "Active",  value: activeStudents,   color: "text-emerald-400",  bg: "bg-emerald-950/50 border border-emerald-900/40" },
                { label: "Dropout", value: dropoutStudents,  color: "text-rose-400",     bg: "bg-rose-950/50 border border-rose-900/40" },
              ].map(s => (
                <div key={s.label} className={`rounded-xl p-3 text-center ${s.bg}`}>
                  <p className={`mono text-2xl font-extrabold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Course breakdown */}
            <div className="px-5 pb-4 space-y-2">
              {[...new Set(students.map(s => s.course))].map(course => {
                const count = students.filter(s => s.course === course).length
                const pct   = Math.round((count / students.length) * 100)
                return (
                  <div key={course} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-28 truncate shrink-0">{course}</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500/60" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="mono text-xs text-slate-600 w-4 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pending fees this month */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex-1">
            <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Pending Fees</h2>
              <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-full">{CURRENT_MONTH}</span>
            </div>
            <div className="divide-y divide-slate-800">
              {currentFees.filter(f => !f.paid).length === 0 ? (
                <p className="px-5 py-6 text-sm text-emerald-500 text-center">✓ All fees collected this month!</p>
              ) : currentFees.filter(f => !f.paid).map((f, i) => (
                <div key={f._id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/40 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-slate-200">{f.student}</p>
                    <p className="text-xs text-slate-500">{f.faculty}</p>
                  </div>
                  <span className="mono text-sm font-bold text-rose-400">₹{f.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Current Month Activities ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Activities This Month</h2>
          <span className="mono text-xs text-slate-500">{currentActivities.length} logged</span>
        </div>
        {currentActivities.length === 0 ? (
          <p className="px-5 py-8 text-center text-slate-600 text-sm">No activities logged for {CURRENT_MONTH}.</p>
        ) : (
          <div className="divide-y divide-slate-800">
            {currentActivities.map(a => {
              const cfg = typeConfig[a.activityType] ?? typeConfig.other
              return (
                <div key={a._id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-800/40 transition-colors">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-slate-200">{a.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{a.faculty} · {a.topic}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs text-slate-600">+</span>
                    <span className="mono text-sm font-bold text-indigo-400">{a.scoreWeight}</span>
                  </div>
                  <span className="mono text-xs text-slate-600 hidden sm:block">{a.date}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Recent Fee Payments ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Recent Payments</h2>
          <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{CURRENT_MONTH}</span>
        </div>
        <div className="divide-y divide-slate-800">
          {currentFees.filter(f => f.paid).length === 0 ? (
            <p className="px-5 py-8 text-center text-slate-600 text-sm">No payments recorded yet.</p>
          ) : currentFees.filter(f => f.paid).map((f, i) => (
            <div key={f._id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <span className="text-xs text-emerald-400">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{f.student}</p>
                  <p className="text-xs text-slate-500">{f.paymentDate}</p>
                </div>
              </div>
              <span className="mono text-sm font-bold text-emerald-400">₹{f.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}