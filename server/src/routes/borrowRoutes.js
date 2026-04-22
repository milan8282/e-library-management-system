import express from 'express'
import {
  borrowBook,
  getMyBorrowedBooks,
  returnBook,
} from '../controllers/borrowController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/my-books', protect, getMyBorrowedBooks)
router.post('/:bookId', protect, borrowBook)
router.post('/return/:bookId', protect, returnBook)

export default router