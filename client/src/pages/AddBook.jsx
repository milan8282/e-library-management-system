import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useBooks from '../hooks/useBooks'

export default function AddBook() {
  const navigate = useNavigate()
  const { addBook } = useBooks()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    description: '',
    totalCopies: 1,
  })

  const [coverImage, setCoverImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'totalCopies' ? Number(value) : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setCoverImage(file || null)
    setPreview(file ? URL.createObjectURL(file) : '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      setMessage('')

      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value))
      if (coverImage) payload.append('coverImage', coverImage)

      const created = await addBook(payload)
      navigate(`/books/${created._id}`)
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Failed to add book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Admin panel
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
          Add New Book
        </h1>
        <p className="mt-2 text-slate-500">Create a polished new entry for your library.</p>
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
            <textarea name="description" value={formData.description} onChange={handleChange} rows="7" placeholder="Description" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400 md:col-span-2" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-lg font-semibold text-slate-900">Cover Image</p>
          <p className="mt-2 text-sm text-slate-500">
            Upload a clean, high-quality book cover.
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