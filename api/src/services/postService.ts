import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 新規投稿API
export const post = async (req: express.Request, res: express.Response) => {
  try {
    const { content } = req.body

    const newPost = await prisma.post.create({
      data: {
        content,
        userId: '06205a6a-8ae7-44b2-877b-8766185e40b7',
      },
    })

    return res.status(201).json(newPost)
  } catch (err) {
    return res.status(500).json(err)
  }
}

// 最新投稿取得API
export const getPosts = async (req: express.Request, res: express.Response) => {
  try {
    const posts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    return res.status(200).json(posts)
  } catch (err) {
    return res.status(500).json(err)
  }
}
