const activities = [
  { title: "AI in Education", type: "Seminar" },
  { title: "Calculus Workshop", type: "Workshop" },
  { title: "DSA Bootcamp", type: "Extra Class" },
]

export default function ActivitiesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Activities</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {activities.map((a, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="font-semibold">{a.title}</h2>
            <p className="text-slate-400 text-sm mt-1">{a.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}