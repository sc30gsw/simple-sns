'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  token: string
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken('')
  }

  const value = {
    token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
