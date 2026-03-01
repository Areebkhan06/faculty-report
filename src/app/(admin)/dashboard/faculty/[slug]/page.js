"use client"

const data = {
  faculty: {
    name: "Areeb Khan",
    email: "areeb@edupanel.com",
    department: "Computer Science",
    role: "admin",
    performanceScore: 87,
    joinedDate: "2023-08-01",
  },
  totalStudents: 5,
  students: [
    { _id: "1", name: "Rahul Sharma",  course: "Full Stack Development", status: "active",  admissionDate: "2024-07-10" },
    { _id: "2", name: "Priya Verma",   course: "MERN Stack",             status: "active",  admissionDate: "2024-07-18" },
    { _id: "3", name: "Aman Gupta",    course: "Data Structures",        status: "dropout", admissionDate: "2024-06-05" },
    { _id: "4", name: "Sneha Patel",   course: "Next.js Bootcamp",       status: "active",  admissionDate: "2024-08-02" },
    { _id: "5", name: "Arjun Mehta",   course: "Backend Development",    status: "active",  admissionDate: "2024-09-01" },
  ],
}

const courseColors = {
  "Full Stack Development": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  "MERN Stack":             "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Data Structures":        "bg-amber-500/10  text-amber-400  border-amber-500/20",
  "Next.js Bootcamp":       "bg-cyan-500/10   text-cyan-400   border-cyan-500/20",
  "Backend Development":    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

const avatarGrads = [
  "from-indigo-500 to-violet-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
]

const initials = (name) =>
  name.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

const scoreLabel = (s) =>
  s >= 90 ? "Excellent" : s >= 75 ? "Good" : s >= 60 ? "Average" : "Needs Work"

const scoreGrad = (s) =>
  s >= 90 ? "from-emerald-500 to-teal-400" :
  s >= 75 ? "from-indigo-500 to-violet-400" :
  s >= 60 ? "from-amber-500 to-orange-400" :
             "from-rose-500 to-pink-400"

const activeCount  = data.students.filter(s => s.status === "active").length
const dropoutCount = data.students.filter(s => s.status === "dropout").length

export default function FacultyDetail({ params }) {
  const slug = params?.slug ?? "areeb-khan"
  const { faculty, students } = data

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-10 md:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'DM Mono', monospace; }
      `}</style>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-600 mono mb-8">
        <span className="hover:text-slate-400 cursor-pointer transition-colors">Dashboard</span>
        <span>/</span>
        <span className="hover:text-slate-400 cursor-pointer transition-colors">Faculty</span>
        <span>/</span>
        <span className="text-slate-400">{slug}</span>
      </div>

      {/* ── Faculty Profile Card ── */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-8">
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-linear-to-r ${scoreGrad(faculty.performanceScore)}`} />

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">

            {/* Avatar */}
            <div className="shrink-0">
              <div className={`w-20 h-20 rounded-2xl bg-linear-to-br ${scoreGrad(faculty.performanceScore)} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                {initials(faculty.name)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-white">{faculty.name}</h1>
                <span className="text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  {faculty.role}
                </span>
              </div>
              <p className="mono text-sm text-slate-500">{faculty.email}</p>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Department</p>
                  <p className="text-sm font-semibold text-slate-200">{faculty.department}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Joined</p>
                  <p className="mono text-sm font-semibold text-slate-200">{faculty.joinedDate}</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Slug</p>
                  <p className="mono text-sm font-semibold text-slate-400 truncate">{slug}</p>
                </div>
              </div>
            </div>

            {/* Score ring (right side) */}
            <div className="shrink-0 flex flex-col items-center gap-2 bg-slate-800 rounded-2xl px-6 py-5 self-start">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="#1e293b" strokeWidth="6" />
                  <circle
                    cx="36" cy="36" r="30"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(faculty.performanceScore / 100) * 188.5} 188.5`}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="mono text-xl font-bold text-white">{faculty.performanceScore}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Performance</p>
              <span className={`text-xs font-semibold bg-linear-to-r ${scoreGrad(faculty.performanceScore)} bg-clip-text text-transparent`}>
                {scoreLabel(faculty.performanceScore)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Students Section ── */}
      <div>
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl font-bold text-white">Assigned Students</h2>
            <p className="text-slate-500 text-sm mt-0.5">{data.totalStudents} students under this faculty</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 text-center">
              <div className="mono text-base font-bold text-emerald-400">{activeCount}</div>
              <div className="text-xs text-slate-500">Active</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2 text-center">
              <div className="mono text-base font-bold text-rose-400">{dropoutCount}</div>
              <div className="text-xs text-slate-500">Dropout</div>
            </div>
          </div>
        </div>

        {/* Student cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student, i) => {
            const course = courseColors[student.course] ?? "bg-slate-800 text-slate-400 border-slate-700"
            const grad   = avatarGrads[i % avatarGrads.length]

            return (
              <div
                key={student._id}
                className="group relative bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl p-5 transition-all duration-200 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at top left, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

                {/* Top row */}
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${grad} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                    {initials(student.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-200 text-sm leading-tight">{student.name}</div>
                    <div className="mono text-xs text-slate-600 mt-0.5">#{student._id.padStart(3, "0")}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${
                    student.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${student.status === "active" ? "bg-emerald-400" : "bg-rose-400"}`} />
                    {student.status}
                  </span>
                </div>

                {/* Course badge */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-xs text-slate-600 mb-1.5 uppercase tracking-widest">Course</p>
                  <span className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full border ${course}`}>
                    {student.course}
                  </span>
                </div>

                {/* Admission */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-600">Admitted</span>
                  <span className="mono text-xs text-slate-500">{student.admissionDate}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}