'use client'

import Link from 'next/link'
import React from 'react'

import { useAuth } from '../context/Auth'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="font-medium text-2xl">
            Simple SNS
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  {user.username}
                </Link>
                <button
                  onClick={logout}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300"
                >
                  新規登録
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
