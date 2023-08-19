import { PrismaClient } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'
import {
  validEmailExistsAndFormat,
  validPasswordLength,
  validUsernameExistsAndLength,
} from './services/validation/userValid'
import { printErrors } from './services/validation/validation'

const app = express()

const PORT = 4000

const prisma = new PrismaClient()

app.use(express.json())

// 新規ユーザー登録API
app.post(
  '/api/auth/register',
  validUsernameExistsAndLength,
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  async (req: express.Request, res: express.Response) => {
    const { username, email, password } = req.body

    const foundUser = await prisma.user.findUnique({ where: { email: email } })
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

    return res.status(201).json({ user })
  },
)

// ユーザーログインAPI
app.post('/api/auth/login', validEmailExistsAndFormat, validPasswordLength)

app.listen(PORT, () => {
  console.log(`server is running on Port ${PORT}`)
})
