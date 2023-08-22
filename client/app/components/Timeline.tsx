'use client'
import { useAuth } from 'app/context/Auth'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'

import type { Post as PostModel } from '../types/Post'
import Post from './Post'
import Spinner from './Spinner'

type TimelineProps = {
  posts: PostModel[]
}

const Timeline = ({ posts }: TimelineProps) => {
  const { token } = useAuth()
  const [content, setContent] = useState('')
  const [errContentMsg, setErrContentMsg] = useState('')

  const router = useRouter()

  // 新規投稿APIの呼び出し
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4000/api/posts/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
        }),
      })

      const res = await response.json()
      if (!response.ok) {
        if (res.errors) return setErrContentMsg(res.errors[0].msg)
        return alert(res.msg)
      }

      router.refresh()

      setContent('')
    } catch (err) {
      alert('予期せぬエラーが発生しました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <p className="text-red-500">{errContentMsg}</p>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {posts.map((post: PostModel) => (
          <Suspense key={post.id} fallback={<Spinner />}>
            <Post post={post} />
          </Suspense>
        ))}
      </main>
    </div>
  )
}

export default Timeline
