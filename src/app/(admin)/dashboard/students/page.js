const students = [
  { _id: "s1", name: "Aarav Singh", course: "B.Tech CSE", status: "active" },
  { _id: "s2", name: "Diya Kapoor", course: "B.Sc Math", status: "active" },
  { _id: "s3", name: "Ishaan Verma", course: "B.Tech CSE", status: "dropout" },
]

export default function StudentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Students</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-800">
            <tr>
              <th className="text-left px-5 py-3 text-slate-400">Name</th>
              <th className="text-left px-5 py-3 text-slate-400">Course</th>
              <th className="text-left px-5 py-3 text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} className="border-b border-slate-800">
                <td className="px-5 py-3">{s.name}</td>
                <td className="px-5 py-3 text-slate-400">{s.course}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    s.status === "active"
                      ? "bg-emerald-900 text-emerald-300"
                      : "bg-rose-900 text-rose-300"
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}