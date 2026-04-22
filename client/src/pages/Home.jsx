import { Link } from 'react-router-dom'

const stats = [
  { label: 'Books Managed', value: '1,200+' },
  { label: 'Active Readers', value: '480+' },
  { label: 'Borrow Requests', value: '3,800+' },
]

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            Premium digital library management
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            A beautiful workspace to manage books, readers, and borrowing flows.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Browse collections, borrow books, manage inventory, and keep users informed
            with a smooth, modern interface designed for real-world use.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/books"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
            >
              Explore Library
            </Link>
            <Link
              to="/register"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                <p className="mt-1 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Library overview</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                  Reading operations at a glance
                </h3>
              </div>
              <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Live
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Current availability</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">986 books</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                    Healthy
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Borrow activity</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-2/3 rounded-full bg-slate-900"></div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  67% of weekly borrowing target completed
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Unread notifications</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">12</p>
                </div>
                <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Books returned today</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}