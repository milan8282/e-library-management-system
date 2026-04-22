import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useBooks from '../hooks/useBooks'
import useAuth from '../hooks/useAuth'

export default function BookDetails() {
  const { id } = useParams()
  const { book, fetchBookById, borrowSelectedBook, returnSelectedBook, loading } = useBooks()
  const { isAuthenticated } = useAuth()
  const [actionLoading, setActionLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBookById(id)
  }, [id])

  const handleBorrow = async () => {
    try {
      setActionLoading(true)
      setMessage('')
      const res = await borrowSelectedBook(id)
      setMessage(res.message || 'Book borrowed successfully')
      await fetchBookById(id)
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to borrow book')
    } finally {
      setActionLoading(false)
    }
  }

  const handleReturn = async () => {
    try {
      setActionLoading(true)
      setMessage('')
      const res = await returnSelectedBook(id)
      setMessage(res.message || 'Book returned successfully')
      await fetchBookById(id)
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to return book')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading || !book) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-slate-600">Loading book details...</p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-slate-100">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-full min-h-[420px] w-full object-cover"
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-slate-400">
                No Cover Image
              </div>
            )}
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              {book.genre}
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-slate-500">by {book.author}</p>

            <p className="mt-6 leading-8 text-slate-600">
              {book.description || 'No description available.'}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Publication Date</p>
                <p className="mt-2 font-semibold text-slate-900">
                  {new Date(book.publicationDate).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Availability</p>
                <p className="mt-2 font-semibold text-slate-900">
                  {book.availableCopies > 0 ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Copies</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {book.availableCopies} / {book.totalCopies}
              </p>
            </div>

            {message && (
              <div className="mt-6 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                {message}
              </div>
            )}

            {isAuthenticated && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleBorrow}
                  disabled={actionLoading || book.availableCopies < 1}
                  className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading ? 'Processing...' : 'Borrow Book'}
                </button>

                <button
                  onClick={handleReturn}
                  disabled={actionLoading}
                  className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Return Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}