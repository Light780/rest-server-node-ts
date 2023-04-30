import express, { Application } from 'express'
import userRouter from '../routes/user.routes'
import cors from 'cors'
import db from '../db/connection'

class Server {
  private readonly app: Application
  private readonly port: string

  constructor () {
    this.app = express()
    this.port = process.env.PORT ?? '8080'

    this.connectDB().then().catch(e => console.log(e))
    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes (): void {
    this.app.use('/api/user', userRouter)
  }

  async connectDB (): Promise<void> {
    try {
      await db.authenticate()
      console.log('Database online')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  listen (): void {
    this.app.listen(this.port, () => {
      console.log('Server running in port: ', this.port)
    })
  }
}

export default Server
