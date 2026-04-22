import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useBooks from '../hooks/useBooks'

export default function EditBook() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { book, fetchBookById, editBook, loading } = useBooks()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    description: '',
    totalCopies: 1,
    availableCopies: 1,
  })

  const [coverImage, setCoverImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchBookById(id)
  }, [id])

  useEffect(() => {
    if (book && book._id === id) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        publicationDate: book.publicationDate
          ? new Date(book.publicationDate).toISOString().split('T')[0]
          : '',
        description: book.description || '',
        totalCopies: book.totalCopies || 1,
        availableCopies: book.availableCopies || 1,
      })

      setPreview(book.coverImage || '')
    }
  }, [book, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'totalCopies' || name === 'availableCopies' ? Number(value) : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setCoverImage(file || null)
    if (file) setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setMessage('')

      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value))
      if (coverImage) payload.append('coverImage', coverImage)

      await editBook(id, payload)
      navigate(`/books/${id}`)
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to update book')
    }
  }

  if (loading && !book) {
    return <p className="text-slate-600">Loading book...</p>
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Admin panel
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Edit Book
        </h1>
        <p className="mt-2 text-slate-500">Update your book details with precision.</p>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Book Title" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400 md:col-span-2" required />
            <input name="author" value={formData.author} onChange={handleChange} type="text" placeholder="Author" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" required />
            <input name="genre" value={formData.genre} onChange={handleChange} type="text" placeholder="Genre" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" required />
            <input name="publicationDate" value={formData.publicationDate} onChange={handleChange} type="date" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" required />
            <input name="totalCopies" value={formData.totalCopies} onChange={handleChange} type="number" min="1" placeholder="Total Copies" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" required />
            <input name="availableCopies" value={formData.availableCopies} onChange={handleChange} type="number" min="0" placeholder="Available Copies" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400 md:col-span-2" required />
            <textarea name="description" value={formData.description} onChange={handleChange} rows="7" placeholder="Description" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400 md:col-span-2" />
          </div>

          <button
            type="submit"
            className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
          >
            Update Book
          </button>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-semibold text-slate-900">Cover Image</p>
          <p className="mt-2 text-sm text-slate-500">
            Upload a new cover if you want to replace the existing one.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          />

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
            {preview ? (
              <img src={preview} alt="Preview" className="h-80 w-full object-cover" />
            ) : (
              <div className="flex h-80 items-center justify-center text-slate-400">
                No image selected
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}