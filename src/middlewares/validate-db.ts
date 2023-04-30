import User from '../models/user.model'

export const existsUserByEmail = async (email: string): Promise<void> => {
  const user = await User.findOne({
    where: {
      email
    }
  })

  if (user != null) {
    throw new Error(`User with email '${email}' already exists`)
  }
}

export const existUserById = async (id: number): Promise<void> => {
  const user = await User.findByPk(id)

  if (user == null) {
    throw new Error(`User with id '${id}' already exists`)
  }
}
