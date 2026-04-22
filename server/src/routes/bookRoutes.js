import express from 'express'
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '../controllers/bookController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { adminOnly } from '../middlewares/adminMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBookById)

router.post('/', protect, adminOnly, upload.single('coverImage'), createBook)
router.put('/:id', protect, adminOnly, upload.single('coverImage'), updateBook)
router.delete('/:id', protect, adminOnly, deleteBook)

export default router