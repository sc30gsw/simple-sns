import type { Metadata } from 'next'
import React from 'react'

import SignUpPage from './page'

export const metadata: Metadata = {
  title: '新規登録',
  description: 'sign up page',
}

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <SignUpPage />
}

export default SignUpLayout
