import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'プロフィール',
  description: 'profile page',
}

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default ProfileLayout
