import type { Post } from './Post'

export type User = {
  id: string
  username: string
  email: string
  posts: Post[]
  profile: Profile
}

type Profile = {
  id: string
  dio?: string
  profileImgUrl?: string
  userId: string
  user: User
}
