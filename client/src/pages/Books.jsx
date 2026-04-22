import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useBooks from '../hooks/useBooks'

export default function Books() {
  const { books, fetchBooks, loading } = useBooks()

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    author: '',
    publicationDate: '',
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const applyFilters = () => {
    fetchBooks(filters)
  }

  const resetFilters = () => {
    const cleared = {
      search: '',
      genre: '',
      author: '',
      publicationDate: '',
    }
    setFilters(cleared)
    fetchBooks()
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Library Collection
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900">
            Discover and manage books beautifully
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore books, filter by author or genre, and move through your library with a refined interface.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <p className="text-sm text-slate-500">Total books</p>
          <p className="text-2xl font-semibold text-slate-900">{books.length}</p>
        </div>
      </div>

      <div className="mb-8 rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search by title..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
          />

          <input
            type="text"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            placeholder="Filter by genre..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
          />

          <input
            type="text"
            name="author"
            value={filters.author}
            onChange={handleChange}
            placeholder="Filter by author..."
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
          />

          <input
            type="date"
            name="publicationDate"
            value={filters.publicationDate}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-slate-400"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={applyFilters}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-600">Loading books...</p>
      ) : books.length === 0 ? (
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-10 text-center shadow-sm backdrop-blur">
          <p className="text-lg font-medium text-slate-900">No books found</p>
          <p className="mt-2 text-slate-500">Try changing your filters or adding a new book.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="group overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.10)]"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    No Cover
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                  {book.genre}
                </div>
              </div>

              <div className="p-5">
                <h2 className="line-clamp-1 text-xl font-semibold text-slate-900">
                  {book.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">by {book.author}</p>

                <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">Available</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {book.availableCopies} / {book.totalCopies}
                    </p>
                  </div>
                  <Link
                    to={`/books/${book._id}`}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}