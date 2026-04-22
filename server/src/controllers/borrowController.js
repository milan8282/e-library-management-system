import Book from '../models/Book.js'
import BorrowRecord from '../models/BorrowRecord.js'
import Notification from '../models/Notification.js'

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const userId = req.user._id

    const book = await Book.findById(bookId)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'No copies available for borrowing' })
    }

    const alreadyBorrowed = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      status: 'borrowed',
    })

    if (alreadyBorrowed) {
      return res.status(400).json({ message: 'You already borrowed this book' })
    }

    const borrowRecord = await BorrowRecord.create({
      user: userId,
      book: bookId,
      status: 'borrowed',
    })

    book.availableCopies -= 1
    await book.save()

    await Notification.create({
      user: userId,
      title: 'Book Borrowed',
      message: `You borrowed "${book.title}" successfully.`,
      type: 'borrow',
    })

    return res.status(201).json({
      message: 'Book borrowed successfully',
      borrowRecord,
    })
  } catch (error) {
    console.error('Borrow book error:', error)
    return res.status(500).json({ message: 'Server error while borrowing book' })
  }
}

const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const userId = req.user._id

    const book = await Book.findById(bookId)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    const borrowRecord = await BorrowRecord.findOne({
      user: userId,
      book: bookId,
      status: 'borrowed',
    })

    if (!borrowRecord) {
      return res.status(400).json({ message: 'No active borrow record found' })
    }

    borrowRecord.status = 'returned'
    borrowRecord.returnedAt = new Date()
    await borrowRecord.save()

    book.availableCopies += 1
    await book.save()

    await Notification.create({
      user: userId,
      title: 'Book Returned',
      message: `You returned "${book.title}" successfully.`,
      type: 'return',
    })

    return res.status(200).json({
      message: 'Book returned successfully',
      borrowRecord,
    })
  } catch (error) {
    console.error('Return book error:', error)
    return res.status(500).json({ message: 'Server error while returning book' })
  }
}

const getMyBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowRecord.find({
      user: req.user._id,
      status: 'borrowed',
    })
      .populate('book')
      .sort({ createdAt: -1 })

    return res.status(200).json(borrowedBooks)
  } catch (error) {
    console.error('Get borrowed books error:', error)
    return res.status(500).json({ message: 'Server error while fetching borrowed books' })
  }
}

export { borrowBook, returnBook, getMyBorrowedBooks }