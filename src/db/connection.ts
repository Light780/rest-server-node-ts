import { Sequelize } from 'sequelize'

const db = new Sequelize('database', 'user', 'pass', {
  dialect: 'sqlite',
  host: 'dev.sqlite'
})

export default db
