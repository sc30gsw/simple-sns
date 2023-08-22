import type { Post } from './Post'

export type User = {
  id: string
  username: string
  email: string
  posts: Post[]
}
