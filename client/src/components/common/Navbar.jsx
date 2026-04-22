import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
    const navigate = useNavigate()
    const { isAuthenticated, logout, user } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const navClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition ${isActive
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
        }`

    const isAdmin = user?.role === 'admin'

    return (
        <header className="sticky top-0 z-50 border-b border-white/40 bg-white/60 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-900/15">
                                EL
                            </div>
                            <div>
                                <p className="text-base font-semibold text-slate-900">E-Library</p>
                                <p className="text-xs text-slate-500">Modern reading workspace</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex flex-wrap items-center gap-2">
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
                                        <NavLink to="/admin-books" className={navClass}>
                                            Admin
                                        </NavLink>
                                        <NavLink to="/admin-dashboard" className={navClass}>
                                            Dashboard
                                        </NavLink>
                                    </>


                                )}
                            </>
                        )}
                    </nav>

                    <div className="flex items-center gap-3">
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
                                <div className="hidden rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm md:block">
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
                </div>
            </div>
        </header>
    )
}