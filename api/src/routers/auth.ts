import express from 'express'
import {
  validEmailExistsAndFormat,
  validPasswordLength,
  validUsernameExistsAndLength,
} from '../services/validation/userValid'
import { printErrors } from '../services/validation/validation'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// 新規ユーザー登録API
router.post(
  '/register',
  validUsernameExistsAndLength,
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  async (req: express.Request, res: express.Response) => {
    try {
      const { username, email, password } = req.body

      const foundUser = await prisma.user.findUnique({ where: { email } })
      if (foundUser)
        return res
          .status(409)
          .json({ msg: 'メールアドレスはすでに登録されています' })

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      })

      const token = jwt.sign(
        { id: user.id },
        process.env.TOKEN_SECRET_KEY as string,
        { expiresIn: '24h' },
      )

      return res.status(201).json({ user, token })
    } catch (err) {
      return res.status(500).json(err)
    }
  },
)

// ユーザーログインAPI
router.post(
  '/login',
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body

      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) return res.status(401).json({ msg: 'ユーザーが存在しません' })

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid)
        return res.status(401).json({ msg: 'そのパスワードは間違っています' })

      const token = jwt.sign(
        { id: user.id },
        process.env.TOKEN_SECRET_KEY as string,
        { expiresIn: '24h' },
      )

      return res.status(201).json({ token })
    } catch (err) {
      return res.status(500).json(err)
    }
  },
)

export default router
