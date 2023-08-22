import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'login page',
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default LoginLayout
