import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from '../config/db.js'
import User from '../models/User.js'
import Book from '../models/Book.js'
import booksData from './booksData.js'

dotenv.config()

const seedBooks = async () => {
  try {
    await connectDB()

    const adminUser = await User.findOne({ role: 'admin' })

    if (!adminUser) {
      throw new Error('No admin user found. Please make one user admin first.')
    }

    await Book.deleteMany({})

    const booksWithCreator = booksData.map((book) => ({
      ...book,
      createdBy: adminUser._id,
    }))

    await Book.insertMany(booksWithCreator)

    console.log('25 books inserted successfully')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seedBooks()