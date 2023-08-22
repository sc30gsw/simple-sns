import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '新規登録',
  description: 'sign up page',
}

const SignUpLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default SignUpLayout
