export default function DashboardLayout({ children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/75 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="border-b border-slate-100 bg-gradient-to-r from-white to-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400"></span>
            <span className="h-3 w-3 rounded-full bg-amber-400"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
          </div>
        </div>
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  )
}