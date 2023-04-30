import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import User from '../models/user.model'

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const users = await User.findAll()

  res.json(users)
}

export const getUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  const user = await User.findByPk(id)

  res.json(user)
}

export const postUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  await user.save()

  res.json(user)
}

export const putUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { name, email, password }: { name: string, email: string, password: string } = req.body

  let user = await User.findOne({
    where: {
      id: {
        [Op.ne]: id
      }
    }
  })

  if (user != null) {
    res.status(400).json({
      msg: `User with email '${email}' already exists`
    })
    return
  }

  user = await User.findByPk(id)
  await user?.update({ name, email, password, updatedAt: new Date() })

  res.json(user)
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params

  const user = await User.findByPk(id)
  await user?.update({ state: false })

  res.json(user)
}
