"use client"

import { useState } from "react"

const faculty = [
  { _id: "f1", name: "Dr. Ananya Sharma" },
  { _id: "f2", name: "Prof. Rohan Mehta" },
  { _id: "f3", name: "Dr. Priya Nair" },
  { _id: "f4", name: "Prof. Karan Joshi" },
]

const students = [
  { _id: "s1", name: "Aarav Singh",    phone: "9876543210", course: "B.Tech CSE",    facultyId: "f1", status: "active",  admissionDate: "2024-07-15" },
  { _id: "s2", name: "Diya Kapoor",    phone: "9123456780", course: "B.Sc Math",     facultyId: "f2", status: "active",  admissionDate: "2024-07-20" },
  { _id: "s3", name: "Ishaan Verma",   phone: "9988776655", course: "B.Tech CSE",    facultyId: "f1", status: "dropout", admissionDate: "2024-06-10" },
  { _id: "s4", name: "Meera Pillai",   phone: "9001122334", course: "M.Sc Physics",  facultyId: "f3", status: "active",  admissionDate: "2024-08-01" },
  { _id: "s5", name: "Yash Patel",     phone: "9871234560", course: "B.Tech ECE",    facultyId: "f4", status: "active",  admissionDate: "2024-07-25" },
  { _id: "s6", name: "Sneha Reddy",    phone: "9765432109", course: "M.Sc Math",     facultyId: "f2", status: "active",  admissionDate: "2024-09-05" },
  { _id: "s7", name: "Arjun Nambiar",  phone: "9654321098", course: "B.Tech ECE",    facultyId: "f4", status: "dropout", admissionDate: "2024-06-20" },
  { _id: "s8", name: "Kavya Menon",    phone: "9543210987", course: "B.Sc Math",     facultyId: "f2", status: "active",  admissionDate: "2024-08-15" },
]

const courseColors = {
  "B.Tech CSE":   { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  "B.Sc Math":    { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20" },
  "M.Sc Physics": { bg: "bg-cyan-500/10",   text: "text-cyan-400",   border: "border-cyan-500/20"   },
  "B.Tech ECE":   { bg: "bg-amber-500/10",  text: "text-amber-400",  border: "border-amber-500/20"  },
  "M.Sc Math":    { bg: "bg-pink-500/10",   text: "text-pink-400",   border: "border-pink-500/20"   },
}

const getFaculty = (id) => faculty.find(f => f._id === id)?.name ?? "—"
const initials = (name) => name.trim().split(" ").filter(Boolean).map(w => w[0]).join("").slice(0, 2).toUpperCase()

const avatarGradients = [
  "from-indigo-500 to-violet-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-violet-500 to-purple-600",
  "from-sky-500 to-cyan-400",
  "from-fuchsia-500 to-pink-500",
]

export default function StudentsPage() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = students.filter(s => {
    const matchStatus = filter === "all" || s.status === filter
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.course.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const activeCount  = students.filter(s => s.status === "active").length
  const dropoutCount = students.filter(s => s.status === "dropout").length

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
      *, body { font-family: 'DM Sans', sans-serif; }
      .mono { font-family: 'DM Mono', monospace; }`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mono mb-1">Institution Panel</p>
          <h1 className="text-3xl font-bold text-white">Students</h1>
          <p className="text-slate-400 text-sm mt-1">{students.length} enrolled across {new Set(students.map(s => s.course)).size} courses</p>
        </div>
        {/* Summary pills */}
        <div className="flex gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-center">
            <div className="mono text-lg font-bold text-emerald-400">{activeCount}</div>
            <div className="text-xs text-slate-500">Active</div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2 text-center">
            <div className="mono text-lg font-bold text-rose-400">{dropoutCount}</div>
            <div className="text-xs text-slate-500">Dropout</div>
          </div>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-600 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "dropout"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === tab
                  ? tab === "active"  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : tab === "dropout" ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                  :                    "bg-indigo-600 text-white border border-indigo-500"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {["Student", "Course", "Faculty", "Phone", "Admission", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-600 text-sm">No students found.</td>
                </tr>
              ) : filtered.map((s, i) => {
                const course = courseColors[s.course] ?? courseColors["B.Tech CSE"]
                const grad   = avatarGradients[i % avatarGradients.length]
                return (
                  <tr key={s._id} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/40 transition-colors group">
                    {/* Name + avatar */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${grad} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                          {initials(s.name)}
                        </div>
                        <span className="font-medium text-slate-200">{s.name}</span>
                      </div>
                    </td>
                    {/* Course */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${course.bg} ${course.text} ${course.border}`}>
                        {s.course}
                      </span>
                    </td>
                    {/* Faculty */}
                    <td className="px-5 py-4 text-slate-400 text-xs">{getFaculty(s.facultyId)}</td>
                    {/* Phone */}
                    <td className="px-5 py-4 mono text-slate-500 text-xs">{s.phone}</td>
                    {/* Admission */}
                    <td className="px-5 py-4 mono text-slate-500 text-xs">{s.admissionDate}</td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        s.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-800">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-slate-600 text-sm">No students found.</div>
          ) : filtered.map((s, i) => {
            const course = courseColors[s.course] ?? courseColors["B.Tech CSE"]
            const grad   = avatarGradients[i % avatarGradients.length]
            return (
              <div key={s._id} className="p-4 flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5`}>
                  {initials(s.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-slate-200 text-sm">{s.name}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                      s.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                      {s.status}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border mt-1.5 ${course.bg} ${course.text} ${course.border}`}>
                    {s.course}
                  </span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                    <span className="text-xs text-slate-500">{getFaculty(s.facultyId)}</span>
                    <span className="mono text-xs text-slate-600">{s.phone}</span>
                    <span className="mono text-xs text-slate-600">{s.admissionDate}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer count */}
        <div className="border-t border-slate-800 px-5 py-3 flex items-center justify-between">
          <span className="text-xs text-slate-600 mono">Showing {filtered.length} of {students.length} students</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-500">{activeCount} active</span>
            <span className="text-slate-700 mx-1">·</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span className="text-xs text-slate-500">{dropoutCount} dropout</span>
          </div>
        </div>
      </div>
    </div>
  )
}