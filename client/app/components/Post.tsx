import { Post } from 'app/types/Post'
import Image from 'next/image'
import React from 'react'

type PostProps = {
  post: Post
}

const Post = ({ post }: PostProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Image
            className="w-10 h-10 rounded-full mr-2"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            width={100}
            height={24}
          />
          <div>
            <h2 className="font-semibold text-md">{post.user?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 break-words">{post.content}</p>
      </div>
    </div>
  )
}

export default Post
