import Book from '../models/Book.js'
import Notification from '../models/Notification.js'
import BorrowRecord from '../models/BorrowRecord.js'
import uploadToCloudinary from '../utils/uploadToCloudinary.js'

const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publicationDate,
      description,
      totalCopies,
    } = req.body

    if (!title || !author || !genre || !publicationDate || !totalCopies) {
      return res.status(400).json({ message: 'Please fill all required fields' })
    }

    let coverImage = ''

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer)
      coverImage = uploaded.secure_url
    }

    const book = await Book.create({
      title,
      author,
      genre,
      publicationDate,
      description,
      coverImage,
      totalCopies: Number(totalCopies),
      availableCopies: Number(totalCopies),
      createdBy: req.user._id,
    })

    return res.status(201).json(book)
  } catch (error) {
    console.error('Create book error:', error)
    return res.status(500).json({ message: 'Server error while creating book' })
  }
}

const getBooks = async (req, res) => {
  try {
    const { search, genre, author, publicationDate } = req.query

    const filter = {}

    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' }
    }

    if (author) {
      filter.author = { $regex: author, $options: 'i' }
    }

    if (publicationDate) {
      const start = new Date(publicationDate)
      const end = new Date(publicationDate)
      end.setDate(end.getDate() + 1)

      filter.publicationDate = {
        $gte: start,
        $lt: end,
      }
    }

    const books = await Book.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    return res.status(200).json(books)
  } catch (error) {
    console.error('Get books error:', error)
    return res.status(500).json({ message: 'Server error while fetching books' })
  }
}

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email')

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.status(200).json(book)
  } catch (error) {
    console.error('Get single book error:', error)
    return res.status(500).json({ message: 'Server error while fetching book' })
  }
}

const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    const oldTitle = book.title

    const {
      title,
      author,
      genre,
      publicationDate,
      description,
      totalCopies,
      availableCopies,
    } = req.body

    book.title = title ?? book.title
    book.author = author ?? book.author
    book.genre = genre ?? book.genre
    book.publicationDate = publicationDate ?? book.publicationDate
    book.description = description ?? book.description
    book.totalCopies = totalCopies !== undefined ? Number(totalCopies) : book.totalCopies
    book.availableCopies =
      availableCopies !== undefined ? Number(availableCopies) : book.availableCopies

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer)
      book.coverImage = uploaded.secure_url
    }

    const updatedBook = await book.save()

    const activeBorrows = await BorrowRecord.find({
      book: book._id,
      status: 'borrowed',
    })

    const notifications = activeBorrows.map((record) => ({
      user: record.user,
      title: 'Book Updated',
      message: `A book you borrowed was updated: "${oldTitle}".`,
      type: 'book_update',
    }))

    if (notifications.length > 0) {
      await Notification.insertMany(notifications)
    }

    return res.status(200).json(updatedBook)
  } catch (error) {
    console.error('Update book error:', error)
    return res.status(500).json({ message: 'Server error while updating book' })
  }
}

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    const activeBorrows = await BorrowRecord.find({
      book: book._id,
      status: 'borrowed',
    })

    const notifications = activeBorrows.map((record) => ({
      user: record.user,
      title: 'Book Removed',
      message: `A book you borrowed was removed: "${book.title}".`,
      type: 'book_delete',
    }))

    if (notifications.length > 0) {
      await Notification.insertMany(notifications)
    }

    await book.deleteOne()

    return res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Delete book error:', error)
    return res.status(500).json({ message: 'Server error while deleting book' })
  }
}

export { createBook, getBooks, getBookById, updateBook, deleteBook }