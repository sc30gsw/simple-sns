'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  token: string
  user: { id: string; email: string; username: string } | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  user: null,
  login: () => {},
  logout: () => {},
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<{
    id: string
    email: string
    username: string
  } | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)

      const getLoginUser = async () => {
        try {
          const response = await fetch('http://localhost:4000/api/auth/find', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
          })

          const res = await response.json()
          if (!response.ok) return alert(res.msg)

          setUser(res.user)
        } catch (err) {
          console.log(err)
        }
      }

      getLoginUser()
    }
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem('auth_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    setToken('')
  }

  const value = {
    token,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
