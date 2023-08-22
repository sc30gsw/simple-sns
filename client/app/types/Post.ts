import type { User } from './User'

export type Post = {
  id: string
  content: string
  createdAt: string
  userId: string
  user: User
}
