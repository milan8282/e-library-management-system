import { useEffect, useState } from 'react'
import useBooks from '../hooks/useBooks'

export default function MyBorrowedBooks() {
  const { borrowedBooks, fetchMyBorrowedBooks, returnSelectedBook, loading } = useBooks()
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchMyBorrowedBooks()
  }, [])

  const handleReturn = async (bookId) => {
    try {
      setMessage('')
      const res = await returnSelectedBook(bookId)
      setMessage(res.message || 'Book returned successfully')
      await fetchMyBorrowedBooks()
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to return book')
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Reading activity
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            My Borrowed Books
          </h1>
          <p className="mt-2 text-slate-500">
            Track the books you currently have in circulation.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Active borrowed books</p>
          <p className="text-2xl font-semibold text-slate-900">{borrowedBooks.length}</p>
        </div>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {message}
        </div>
      )}

      <div className="grid gap-5">
        {loading ? (
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-slate-600 shadow-sm">
            Loading borrowed books...
          </div>
        ) : borrowedBooks.length === 0 ? (
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 text-center shadow-sm">
            <p className="text-lg font-medium text-slate-900">
              You haven’t borrowed any books yet
            </p>
            <p className="mt-2 text-slate-500">
              Browse the library and borrow a book to see it here.
            </p>
          </div>
        ) : (
          borrowedBooks.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-5">
                <div className="h-20 w-16 overflow-hidden rounded-2xl bg-slate-100">
                  {item.book?.coverImage ? (
                    <img
                      src={item.book.coverImage}
                      alt={item.book?.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {item.book?.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Borrowed on {new Date(item.borrowedAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    by {item.book?.author || 'Unknown author'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleReturn(item.book?._id)}
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
              >
                Return Book
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}