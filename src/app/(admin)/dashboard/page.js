export default function Overview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Faculty" value="4" />
        <Card title="Students" value="6" />
        <Card title="Fees Collected" value="₹19,000" />
        <Card title="Activities" value="6" />
      </div>
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  )
}