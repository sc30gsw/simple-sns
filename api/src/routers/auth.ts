import express from 'express'
import {
  validEmailExistsAndFormat,
  validPasswordLength,
  validUsernameExistsAndLength,
} from '../services/validation/userValid'
import { printErrors } from '../services/validation/validation'
import { PrismaClient } from '@prisma/client'
import { login, register } from '../services/authService'

const router = express.Router()

// 新規ユーザー登録API
router.post(
  '/register',
  validUsernameExistsAndLength,
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  (req: express.Request, res: express.Response) => {
    register(req, res)
  },
)

// ユーザーログインAPI
router.post(
  '/login',
  validEmailExistsAndFormat,
  validPasswordLength,
  printErrors,
  (req: express.Request, res: express.Response) => {
    login(req, res)
  },
)

export default router
