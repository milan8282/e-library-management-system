import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import borrowRoutes from './routes/borrowRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'

dotenv.config()

const app = express()

const allowedOrigins = [
    "https://e-library-management-system-olive.vercel.app/",
    process.env.CLIENT_URL,
].filter(Boolean)

app.use(
    cors('*'),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'E-Library API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)
app.use('/api/notifications', notificationRoutes)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

export default app