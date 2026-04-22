import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-10 text-white lg:block">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-300">Get started</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">
            Create your modern library workspace in minutes.
          </h1>
          <p className="mt-5 max-w-md text-slate-300">
            Organize books, manage borrowing, and build a smooth reading experience with a clean premium dashboard.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Track inventory</p>
              <p className="mt-2 text-lg font-medium text-white">
                Add, edit, and monitor your books easily
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-300">Borrowing workflow</p>
              <p className="mt-2 text-lg font-medium text-white">
                Keep user activity and book availability in sync
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Create account
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Join E-Library
            </h2>
            <p className="mt-2 text-slate-500">Set up your account to continue.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {error && (
                <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400"
                required
              />

              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400"
                required
              />

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-slate-900 px-4 py-3.5 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-slate-900 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}