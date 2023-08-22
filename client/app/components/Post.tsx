import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Post } from '../types/Post'

type PostProps = {
  post: Post
  isProfile: boolean
}

const Post = ({ post, isProfile }: PostProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          {isProfile ? (
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src={post.user.profile.profileImgUrl as string}
              alt="User Avatar"
              width={100}
              height={24}
            />
          ) : (
            <Link
              href={`/profile/${post.userId}`}
              className="hover:opacity-70 transition-all duration-300"
            >
              <Image
                className="w-10 h-10 rounded-full mr-2"
                src={post.user.profile.profileImgUrl as string}
                alt="User Avatar"
                width={100}
                height={24}
              />
            </Link>
          )}
          <div>
            {isProfile ? (
              <h2 className="font-semibold text-md">{post.user?.username}</h2>
            ) : (
              <Link
                href={`/profile/${post.userId}`}
                className="hover:underline"
              >
                <h2 className="font-semibold text-md">{post.user?.username}</h2>
              </Link>
            )}
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
