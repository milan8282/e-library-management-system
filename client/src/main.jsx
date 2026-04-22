import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import BookProvider from './context/BookContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BookProvider>
        <>
          <Toaster position="top-right" />
          <App />
        </>
      </BookProvider>
    </AuthProvider>
  </StrictMode>,
)