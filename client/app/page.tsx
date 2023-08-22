import React from 'react'

import Timeline from './components/Timeline'
import type { Post } from './types/Post'

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('http://localhost:4000/api/posts/getPosts', {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const posts: Post[] = await response.json()
  return posts ? posts : []
}

const Home = async () => {
  const posts: Post[] = await getPosts()

  return (
    <div>
      <Timeline posts={posts} />
    </div>
  )
}

export default Home
