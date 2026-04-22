import useAuth from '../hooks/useAuth'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            View your account details and role information.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Role</p>
          <p className="text-lg font-semibold capitalize text-slate-900">
            {user?.role || 'user'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-2xl font-semibold uppercase">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            {user?.name || 'Library User'}
          </h2>
          <p className="mt-2 text-slate-300">{user?.email || 'No email available'}</p>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Status</p>
            <p className="mt-2 text-lg font-medium text-white">Active account</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
          <h3 className="text-xl font-semibold text-slate-900">Account Details</h3>

          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {user?.name || 'N/A'}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {user?.email || 'N/A'}
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">User Role</p>
              <p className="mt-2 text-lg font-semibold capitalize text-slate-900">
                {user?.role || 'user'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}