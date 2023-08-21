import type { Metadata } from 'next'
import React from 'react'

import Login from './page'

export const metadata: Metadata = {
  title: 'ログイン',
  description: 'login page',
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <Login />
}

export default LoginLayout
