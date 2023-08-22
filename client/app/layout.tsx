import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import Navbar from './components/Navbar'
import { AuthProvider } from './context/Auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simple SNS',
  description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
