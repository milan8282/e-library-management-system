import api from './axios'

export const getAllBooks = async (params = {}) => {
  const { data } = await api.get('/books', { params })
  return data
}

export const getBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`)
  return data
}

export const createBook = async (formData) => {
  const { data } = await api.post('/books', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const updateBook = async (id, formData) => {
  const { data } = await api.put(`/books/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/${id}`)
  return data
}

export const borrowBook = async (bookId) => {
  const { data } = await api.post(`/borrow/${bookId}`)
  return data
}

export const returnBook = async (bookId) => {
  const { data } = await api.post(`/borrow/return/${bookId}`)
  return data
}

export const getMyBorrowedBooks = async () => {
  const { data } = await api.get('/borrow/my-books')
  return data
}