import { createContext, useMemo, useState } from 'react'
import {
  borrowBook,
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getMyBorrowedBooks,
  returnBook,
  updateBook,
} from '../api/bookApi'

export const BookContext = createContext(null)

export default function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState(null)
  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchBooks = async (params = {}) => {
    setLoading(true)
    try {
      const data = await getAllBooks(params)
      setBooks(data)
    } finally {
      setLoading(false)
    }
  }

  const fetchBookById = async (id) => {
    setLoading(true)
    try {
      const data = await getBookById(id)
      setBook(data)
    } finally {
      setLoading(false)
    }
  }

  const addBook = async (payload) => {
    const data = await createBook(payload)
    await fetchBooks()
    return data
  }

  const editBook = async (id, payload) => {
    const data = await updateBook(id, payload)
    await fetchBooks()
    return data
  }

  const removeBook = async (id) => {
    const data = await deleteBook(id)
    await fetchBooks()
    return data
  }

  const borrowSelectedBook = async (bookId) => {
    const data = await borrowBook(bookId)
    await fetchBooks()
    return data
  }

  const returnSelectedBook = async (bookId) => {
    const data = await returnBook(bookId)
    await fetchBooks()
    return data
  }

  const fetchMyBorrowedBooks = async () => {
    setLoading(true)
    try {
      const data = await getMyBorrowedBooks()
      setBorrowedBooks(data)
    } finally {
      setLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      books,
      book,
      borrowedBooks,
      loading,
      fetchBooks,
      fetchBookById,
      addBook,
      editBook,
      removeBook,
      borrowSelectedBook,
      returnSelectedBook,
      fetchMyBorrowedBooks,
    }),
    [books, book, borrowedBooks, loading],
  )

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}