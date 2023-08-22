import express from 'express'
import { printErrors } from '../services/validation/validation'
import { validContentExistsAndLength } from '../services/validation/postsValid'
import { getPosts, post } from '../services/postService'

const router = express.Router()

// 新規投稿API
router.post(
  '/post',
  validContentExistsAndLength,

  printErrors,
  (req: express.Request, res: express.Response) => {
    post(req, res)
  },
)

router.get('/getPosts', (req: express.Request, res: express.Response) => {
  getPosts(req, res)
})

export default router
