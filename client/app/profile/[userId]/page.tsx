import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

import Post from '../../components/Post'
import type { Post as PostModel } from '../../types/Post'
import type { Profile } from '../../types/User'

const fetchUserProfile = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/users/profile/${userId}`,
      { headers: { 'Content-Type': 'application/json' }, cache: 'no-store' },
    )

    const res = await response.json()

    if (response.status === 404) {
      alert(res.msg)
      return notFound()
    }

    return res
  } catch (err) {
    return notFound()
  }
}

export const generateStaticParams = async () => {
  const response = await fetch(
    'http://localhost:4000/api/users/profile/getAllProfiles',
    { headers: { 'Content-Type': 'application/json' } },
  )

  const profiles: Profile[] = await response.json()

  return profiles.map((profile) => ({
    userId: profile.userId,
  }))
}

type PageProps = {
  params: {
    userId: string
  }
}

const UserProfile = async ({ params }: PageProps) => {
  const data: { profile: Profile; posts: PostModel[] } = await fetchUserProfile(
    params.userId,
  )
  const profile: Profile = data.profile
  const posts: PostModel[] = data.posts

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              width={0}
              height={0}
              src={profile.profileImgUrl as string}
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile.user.username}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
        {posts.map((post: PostModel) => (
          <Post key={post.id} post={post} isProfile={true} />
        ))}
      </div>
    </div>
  )
}

export default UserProfile
