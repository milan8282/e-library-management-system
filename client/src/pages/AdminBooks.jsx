import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useBooks from '../hooks/useBooks'

export default function AdminBooks() {
  const { books, fetchBooks, removeBook, loading } = useBooks()
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?')
    if (!confirmed) return

    try {
      setMessage('')
      const res = await removeBook(id)
      setMessage(res.message || 'Book deleted successfully')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to delete book')
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Admin panel
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Manage Books
          </h1>
          <p className="mt-2 text-slate-500">
            Add, update, and maintain your library collection.
          </p>
        </div>

        <Link
          to="/add-book"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
        >
          Add New Book
        </Link>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="hidden grid-cols-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600 md:grid">
          <span>Book</span>
          <span>Author</span>
          <span>Copies</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-slate-600">Loading books...</div>
        ) : books.length === 0 ? (
          <div className="px-6 py-8 text-slate-600">No books found.</div>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="grid gap-4 border-b border-slate-100 px-6 py-5 last:border-b-0 md:grid-cols-4 md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-14 overflow-hidden rounded-2xl bg-slate-100">
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
                  <p className="text-sm text-slate-400">{book.genre}</p>
                </div>
              </div>

              <span className="text-slate-600">{book.author}</span>

              <span className="text-slate-600">
                {book.availableCopies} / {book.totalCopies}
              </span>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/edit-book/${book._id}`}
                  className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}