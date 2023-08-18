import { body, oneOf } from 'express-validator'

export const validUsernameLength = body('username')
  .isLength({ min: 8 })
  .withMessage('ユーザー名は8文字以上入力してください')

export const validEmailFormat = body('email')
  .isEmail()
  .withMessage('有効なメールアドレスを入力してください')
  .normalizeEmail()

export const validPasswordLength = body('password')
  .isLength({ min: 8 })
  .withMessage('パスワードは8文字以上入力してください')

export const validUsernameOrEmail = oneOf([
  [
    body('username')
      .exists()
      .withMessage('ユーザー名またはメールアドレスを入力してください')
      .isLength({ min: 8 })
      .withMessage('ユーザー名は8文字以上で入力してください'),
  ],
  [
    body('email')
      .exists()
      .withMessage('ユーザー名またはメールアドレスを入力してください')
      .isEmail()
      .withMessage('有効なメールアドレスを入力してください')
      .normalizeEmail(),
  ],
])
