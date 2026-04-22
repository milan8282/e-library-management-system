import { createContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/authApi'

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token')

      if (!savedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await getCurrentUser()
        setUser(response?.user || response?.data || response)
      } catch (error) {
        console.error('Failed to fetch current user:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (formData) => {
    const response = await loginUser(formData)

    const receivedToken = response?.token || response?.data?.token
    const receivedUser = response?.user || response?.data?.user

    if (!receivedToken) {
      throw new Error('Token not received from server')
    }

    localStorage.setItem('token', receivedToken)
    if (receivedUser) {
      localStorage.setItem('user', JSON.stringify(receivedUser))
    }

    setToken(receivedToken)
    setUser(receivedUser || null)

    return response
  }

  const register = async (formData) => {
    const response = await registerUser(formData)

    const receivedToken = response?.token || response?.data?.token
    const receivedUser = response?.user || response?.data?.user

    if (receivedToken) {
      localStorage.setItem('token', receivedToken)
      setToken(receivedToken)
    }

    if (receivedUser) {
      localStorage.setItem('user', JSON.stringify(receivedUser))
      setUser(receivedUser)
    }

    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      setUser,
    }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}