import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

class DBHandler {
  private dbname: string = 'test'
  private mongod: MongoMemoryServer | undefined

  /** Connect to in-memory database **/

  public async connectDB(): Promise<void> {
    if (!this.mongod) {
      this.mongod = await MongoMemoryServer.create()
      mongoose.set('strictQuery', false)
      mongoose.connection.on('connected', () => console.log('Connected to DB'))

      await mongoose.connect(this.mongod.getUri(), { dbName: this.dbname })
    }
  }

  /** Drop database **/
  public async dropDB(): Promise<void> {
    await mongoose.connection.dropDatabase()
  }

  /** Drop db, closes connection and stop mongo **/

  public async closeDB(): Promise<void> {
    await this.dropDB()
    await mongoose.connection.close()

    if (this.mongod) {
      this.mongod.stop()
    }
  }
}

export default DBHandler
