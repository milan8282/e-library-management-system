import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

console.log('Startup check:', {
  PORT,
  hasMongo: !!process.env.MONGO_URI,
  hasJwt: !!process.env.JWT_SECRET,
  hasClientUrl: !!process.env.CLIENT_URL,
  hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
  hasCloudKey: !!process.env.CLOUDINARY_API_KEY,
  hasCloudSecret: !!process.env.CLOUDINARY_API_SECRET,
})

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Fatal startup error:', error)
    process.exit(1)
  }
}

startServer()