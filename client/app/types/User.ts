import type { Post } from './Post'

export type User = {
  id: string
  username: string
  email: string
  posts: Post[]
  profile: Profile
}

export type Profile = {
  id: string
  bio?: string
  profileImgUrl?: string
  userId: string
  user: User
}
