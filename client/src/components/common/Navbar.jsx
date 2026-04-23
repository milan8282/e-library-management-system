import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    navigate('/login')
  }

  const handleNavClick = () => {
    setMobileOpen(false)
  }

  const isAdmin = user?.role === 'admin'

  const navClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
    }`

  const mobileNavClass = ({ isActive }) =>
    `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? 'bg-slate-900 text-white shadow-sm'
        : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={handleNavClick}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-900/15">
              EL
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">E-Library</p>
              <p className="text-xs text-slate-500">Modern reading workspace</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={navClass}>
              Books
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink to="/my-borrowed-books" className={navClass}>
                  My Books
                </NavLink>
                <NavLink to="/profile" className={navClass}>
                  Profile
                </NavLink>
                <NavLink to="/notifications" className={navClass}>
                  Notifications
                </NavLink>

                {isAdmin && (
                  <>
                    <NavLink to="/admin-dashboard" className={navClass}>
                      Dashboard
                    </NavLink>
                    <NavLink to="/admin-books" className={navClass}>
                      Admin
                    </NavLink>
                  </>
                )}
              </>
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm">
                  {user?.name || user?.email || 'User'}
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-slate-700 transition ${
                  mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded bg-slate-700 transition ${
                  mobileOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded bg-slate-700 transition ${
                  mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileOpen ? 'max-h-[700px] pt-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="rounded-[28px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            {isAuthenticated && (
              <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Signed in as
                </p>
                <p className="mt-1 font-medium text-slate-900">
                  {user?.name || user?.email || 'User'}
                </p>
                {user?.role && (
                  <p className="mt-1 text-sm capitalize text-slate-500">{user.role}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <NavLink to="/" className={mobileNavClass} onClick={handleNavClick}>
                Home
              </NavLink>
              <NavLink to="/books" className={mobileNavClass} onClick={handleNavClick}>
                Books
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/my-borrowed-books"
                    className={mobileNavClass}
                    onClick={handleNavClick}
                  >
                    My Books
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={mobileNavClass}
                    onClick={handleNavClick}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/notifications"
                    className={mobileNavClass}
                    onClick={handleNavClick}
                  >
                    Notifications
                  </NavLink>

                  {isAdmin && (
                    <>
                      <NavLink
                        to="/admin-dashboard"
                        className={mobileNavClass}
                        onClick={handleNavClick}
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin-books"
                        className={mobileNavClass}
                        onClick={handleNavClick}
                      >
                        Admin
                      </NavLink>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
              {!isAuthenticated ? (
                <div className="grid gap-3">
                  <Link
                    to="/login"
                    onClick={handleNavClick}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleNavClick}
                    className="rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}