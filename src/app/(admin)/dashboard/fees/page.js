const fees = [
  { student: "Aarav Singh", amount: 5000, paid: true },
  { student: "Diya Kapoor", amount: 4500, paid: true },
  { student: "Ishaan Verma", amount: 5000, paid: false },
]

export default function FeesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Fees</h1>

      <div className="space-y-4">
        {fees.map((f, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between">
            <span>{f.student}</span>
            <span className="text-slate-400">₹{f.amount}</span>
            <span className={`text-sm ${
              f.paid ? "text-emerald-400" : "text-rose-400"
            }`}>
              {f.paid ? "Paid" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}