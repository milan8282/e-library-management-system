import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useBooks from '../hooks/useBooks'
import { getNotifications } from '../api/notificationApi'

export default function AdminDashboard() {
  const { books, borrowedBooks, fetchBooks, fetchMyBorrowedBooks } = useBooks()

  useEffect(() => {
    fetchBooks()
    fetchMyBorrowedBooks()
  }, [])

  const totalBooks = books.length
  const totalCopies = books.reduce((sum, book) => sum + (book.totalCopies || 0), 0)
  const availableCopies = books.reduce((sum, book) => sum + (book.availableCopies || 0), 0)
  const borrowedCount = totalCopies - availableCopies
  const categories = [...new Set(books.map((book) => book.genre).filter(Boolean))]

  const latestBooks = [...books].slice(0, 5)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Admin workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Library Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Monitor your collection, borrowing activity, and library health from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/add-book"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Add Book
          </Link>
          <Link
            to="/admin-books"
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Manage Books
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Total Titles</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalBooks}</p>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Total Copies</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{totalCopies}</p>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Available Copies</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-600">{availableCopies}</p>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-sm text-slate-500">Borrowed Copies</p>
          <p className="mt-3 text-3xl font-semibold text-indigo-600">{borrowedCount}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Latest Books</h2>
              <p className="mt-1 text-sm text-slate-500">
                Recently added titles in your library
              </p>
            </div>
            <Link
              to="/admin-books"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {latestBooks.length === 0 ? (
              <div className="rounded-3xl bg-slate-50 p-5 text-slate-500">
                No books available yet.
              </div>
            ) : (
              latestBooks.map((book) => (
                <div
                  key={book._id}
                  className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-12 overflow-hidden rounded-2xl bg-slate-200">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{book.title}</p>
                      <p className="text-sm text-slate-500">{book.author}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Available</p>
                    <p className="font-semibold text-slate-900">
                      {book.availableCopies}/{book.totalCopies}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <h2 className="text-xl font-semibold text-slate-900">Collection Breakdown</h2>
            <p className="mt-1 text-sm text-slate-500">
              Genres currently in your library
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {categories.length === 0 ? (
                <p className="text-slate-500">No categories yet.</p>
              ) : (
                categories.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {genre}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/70 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Quick actions
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Run your library smoothly</h2>

            <div className="mt-6 grid gap-3">
              <Link
                to="/add-book"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Add a new book
              </Link>
              <Link
                to="/notifications"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Review notifications
              </Link>
              <Link
                to="/my-borrowed-books"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Inspect borrowed activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}