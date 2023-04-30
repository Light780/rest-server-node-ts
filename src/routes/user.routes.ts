import { Router } from 'express'
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/user.controller'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validate-fields'
import { existUserById, existsUserByEmail } from '../middlewares/validate-db'

const userRouter = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

userRouter.get('/', getUsers)

userRouter.get('/:id', [
  check('id').isNumeric().withMessage('id must be numeric'),
  check('id').custom(existUserById),
  validateFields
], getUser)

userRouter.post('/', [
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('email format invalid'),
  check('email').custom(existsUserByEmail),
  check('password').isLength({ min: 6 }).withMessage('password must have 6 characters min'),
  validateFields
], postUser)

userRouter.put('/:id', [
  check('id').isNumeric().withMessage('id must be numeric'),
  check('id').custom(existUserById),
  check('name').notEmpty().withMessage('name is required'),
  check('email').isEmail().withMessage('email format invalid'),
  check('password').isLength({ min: 6 }).withMessage('password must have 6 characters min'),
  validateFields
], putUser)

userRouter.delete('/:id', [
  check('id').isNumeric().withMessage('id must be numeric'),
  check('id').custom(existUserById),
  validateFields
], deleteUser)

/* eslint-enable @typescript-eslint/no-misused-promises */

export default userRouter
