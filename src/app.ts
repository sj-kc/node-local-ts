import express from 'express'
import DBHandler from './db/db.handler'
import DBSeeder from './db/db.seeder'
import { Controller } from './interfaces'
import errorMiddleware from './middleware/error.middleware'

class App {
  private app: express.Application
  private port: number

  constructor(controllers: Controller[]) {
    this.app = express()
    this.port = 3000
    ;(async () => {
      await this.initDB()
    })()

    this.initMiddleware()
    this.initControllers(controllers)
    this.app.use(errorMiddleware)
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server up port: ${this.port}`)
    })
  }

  async initDB(): Promise<void> {
    const dbHandler = new DBHandler()
    const dbSeeder = new DBSeeder()

    await dbHandler.connectDB()
    await dbSeeder.accountSeeder()
  }

  private initMiddleware(): void {
    this.app.use(express.json())
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.route)
    })
  }
}

export default App
