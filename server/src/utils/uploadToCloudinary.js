import { Readable } from 'stream'
import cloudinary from '../config/cloudinary.js'

const uploadToCloudinary = (fileBuffer, folder = 'e-library/books') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      },
    )

    const stream = Readable.from(fileBuffer)
    stream.pipe(uploadStream)
  })
}

export default uploadToCloudinary